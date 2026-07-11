import { db } from "@/firebase/config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";


// Modelo de como o evento está estruturado no banco
const modeloEventoBanco = {
  id: "",
  nome: "",
  slug: "",
  local: "",
  descricao: "",
  periodoInicio: null as any, // ou Date, dependendo de como salvou
  periodoTermino: null as any,
  status: "",
  banner: {
    url: "",
    objectKey: "",
    uploadConfirmado: true
  },
  estatisticas: { totalInscritos: 0 }
};

// Exporta o tipo para usar na listagem
export type EventoDoBancoType = typeof modeloEventoBanco;







export async function criarEventoCompleto(
  dadosDoFormulario: any,
  arquivoBanner: File,
) {
  // 1. Reserva o ID
  const novaRefEvento = doc(collection(db, "eventos"));
  const eventoId = novaRefEvento.id;

  // 2. Manda para a API do Next.js
  const dadosUpload = new FormData();
  dadosUpload.append("file", arquivoBanner);
  dadosUpload.append("eventoId", eventoId);

  const respostaApi = await fetch("/api/upload-banner", {
    method: "POST",
    body: dadosUpload,
  });

  const { url } = await respostaApi.json();

  // 3. Monta o objeto com as datas combinadas
  const novoEvento = {
    id: eventoId,
    nome: dadosDoFormulario.nome,
    slug: `${dadosDoFormulario.nome.toLowerCase().replace(/ /g, "-")}-2026`,
    local: dadosDoFormulario.local,
    descricao: dadosDoFormulario.descricao,
    periodoInicio: new Date(
      `${dadosDoFormulario.dataInicio}T${dadosDoFormulario.horaInicio}`,
    ),
    periodoTermino: new Date(
      `${dadosDoFormulario.dataTermino}T${dadosDoFormulario.horaTermino}`,
    ),
    banner: {
      objectKey: `eventos/${eventoId}/banner.jpg`,
      url: url,
      uploadConfirmado: true,
    },
    status: "publicado",
    estatisticas: { totalInscritos: 0 },
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  };

  // 4. Salva no banco
  await setDoc(novaRefEvento, novoEvento);
  return eventoId;
}




export async function editarEventoCompleto(
  eventoId: string, // <-- 1. Agora recebemos o ID do evento que veio da URL
  dadosDoFormulario: any,
  arquivoBanner?: File // <-- Torna opcional, caso o user não queira trocar de foto
) {
  let url = dadosDoFormulario.bannerUrlAntiga; // Guarda a URL atual caso ele não mude de imagem

  // 2. Só faz o upload para o Cloudflare R2 se o utilizador enviou um arquivo de banner novo
  if (arquivoBanner) {
    const dadosUpload = new FormData();
    dadosUpload.append("file", arquivoBanner);
    dadosUpload.append("eventoId", eventoId);

    const respostaApi = await fetch("/api/upload-banner", {
      method: "POST",
      body: dadosUpload,
    });

    const resultadoJson = await respostaApi.json();
    url = resultadoJson.url;
  }

  // 3. Monta o objeto apenas com o que mudou ou deve ser atualizado
  const dadosAtualizados = {
    nome: dadosDoFormulario.nome,
    slug: `${dadosDoFormulario.nome.toLowerCase().replace(/ /g, "-")}-2026`,
    local: dadosDoFormulario.local,
    descricao: dadosDoFormulario.descricao,
    
    // Combina as strings de data e hora para salvar como Date do JS (Firebase converte para Timestamp)
    periodoInicio: new Date(`${dadosDoFormulario.dataInicio}T${dadosDoFormulario.horaInicio}`),
    periodoTermino: new Date(`${dadosDoFormulario.dataTermino}T${dadosDoFormulario.horaTermino}`),
    
    banner: {
      objectKey: `eventos/${eventoId}/banner.jpg`,
      url: url,
      uploadConfirmado: true,
    },
    
    // ATENÇÃO: Removemos o criadoEm e estatisticas daqui para não apagar do banco!
    atualizadoEm: new Date(),
  };

  // 4. Faz o Update direcionado no documento exato
  const docRef = doc(db, "eventos", eventoId);
  await updateDoc(docRef, dadosAtualizados); 

  return eventoId;
}