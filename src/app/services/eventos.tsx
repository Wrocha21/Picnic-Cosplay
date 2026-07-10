import { db } from "@/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";

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
    nome: dadosDoFormulario.nome,
    slug: `${dadosDoFormulario.nome.toLowerCase().replace(/ /g, "-")}-2026`,
    local: dadosDoFormulario.local,
    descricao: dadosDoFormulario.descricao,
    periodoInicio: `${dadosDoFormulario.dataInicio} - ${dadosDoFormulario.horaInicio}`, // Ex: "10/07 - 11:00"
    periodoTermino: `${dadosDoFormulario.dataTermino} - ${dadosDoFormulario.horaTermino}`,
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
