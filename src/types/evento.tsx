export interface EventoBanner {
  objectKey: string;
  url: string;
  uploadConfirmado: boolean;
}

export interface EventoEstatisticas {
  totalInscritos: number;
}

export interface Evento {
  id?: string; // O ID gerado pelo Firestore (opcional, pois não vai no corpo do documento)
  nome: string;
  slug: string;
  local: string;
  descricao: string;
  
  // Se mudaste para Timestamp/Date do Firebase:
  periodoInicio: Date; 
  periodoTermino: Date;
  
  // SE MANTIVESTE COMO STRING (como na imagem antiga), usa esta versão:
  // periodoInicio: string;
  // periodoTermino: string;

  banner: EventoBanner;
  status: "publicado" | "rascunho" | "arquivado"; // Union type para garantir os status válidos
  estatisticas: EventoEstatisticas;
  
  // Datas de controlo do sistema (geradas como new Date())
  criadoEm: Date;
  atualizadoEm: Date;
}