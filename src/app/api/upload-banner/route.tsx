import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Inicializa o cliente do R2 puxando os dados do seu .env automaticamente
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const eventoId = formData.get('eventoId') as string;

    if (!file || !eventoId) {
      return NextResponse.json({ error: 'Dados obrigatórios ausentes.' }, { status: 400 });
    }

    // Converte o arquivo vindo do formulário em um Buffer que o R2 entende
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Define o caminho/nome do arquivo lá no R2 (ex: eventos/id_do_evento/banner.jpg)
    const path = `eventos/${eventoId}/banner.jpg`;

    // Envia o arquivo para o Cloudflare R2
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: file.type, // Mantém o formato original (png, jpg, etc.)
      })
    );

    // Junta a sua URL pública com o caminho do arquivo para gerar o link final
    const urlPublica = `${process.env.CLOUDFLARE_CDN_URL}/${path}`;

    return NextResponse.json({ url: urlPublica });
  } catch (error: any) {
    console.error("Erro no upload do R2:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}