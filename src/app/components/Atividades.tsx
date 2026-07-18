"use client";

import { useRef, useState } from "react";
import "@/app/Assets/styles.css";

type AtividadeCard = {
  id: string;
  titulo: string;
  descricao: string | null;
  imagemUrl: string;
};

// Títulos vindos diretamente dos assets/telas fornecidos. As descrições
// marcadas como `null` não apareciam legíveis em nenhuma imagem enviada —
// deixei o placeholder visível em vez de inventar o texto de marketing.
const atividades: AtividadeCard[] = [
  {
    id: "concurso-cosplays",
    titulo: "Concurso Cosplays",
    descricao:
      "Se você ama interpretar, desfilar e dar vida aos seus personagens, esse é o seu momento 👑💃",
    imagemUrl: "/images/1.png",
  },
  {
    id: "animeke",
    titulo: "Animekê",
    descricao: "você ama cantar as músicas dos seus animes favoritos? Mostre o seu talento",
    imagemUrl: "/images/2.png",
  },
  {
    id: "dorama",
    titulo: "Adivinhe o Dorama",
    descricao:
      "Se você é apaixonado por doramas, prepare-se para testar seus conhecimentos",
    imagemUrl: "/images/3.png",
  },
  {
    id: "Gincanas",
    titulo:"Gincanas",
    descricao:
      "Se você você gosta de gincanas, perguntas sobre animes, prepare-se para testar seus conhecimentos",
    imagemUrl: "/images/4.png",
  },
  {
    id: "Kpop",
    titulo:"Kpop",
    descricao: "Gosta de dançar kpop? então arrase nas pistas de danças!",
    imagemUrl: "/images/5.png",
  },
];

export default function Atividades() {
  const trilhaRef = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(0);

  function irPara(proximoIndice: number) {
    const alvo = Math.max(0, Math.min(proximoIndice, atividades.length - 1));
    setIndice(alvo);
    const trilha = trilhaRef.current;
    if (trilha) {
      const card = trilha.children[alvo] as HTMLElement | undefined;
      card?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }

  return (
    <section className="atividades">
      <div className="atividades-cabecalho">
        <span className="atividades-eyebrow">Nossas atividades</span>
        <h2 className="atividades-titulo">
          <span aria-hidden="true">✨</span> Muita diversão te espera!{" "}
          <span aria-hidden="true">✨</span>
        </h2>
      </div>

      <div className="atividades-carrossel">
        <button
          type="button"
          className="atividades-seta atividades-seta-esquerda"
          onClick={() => irPara(indice - 1)}
          disabled={indice === 0}
          aria-label="Atividade anterior"
        >
          ‹
        </button>

        <div className="atividades-trilha" ref={trilhaRef}>
          {atividades.map((atividade) => (
            <article key={atividade.id} className="atividades-card">
              <div className="atividades-card-imagem">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={atividade.imagemUrl}
                  alt={atividade.titulo ?? "Atividade do evento"}
                />
              </div>
              <h3 className="atividades-card-titulo">
                {atividade.titulo ?? "[ título não visível na imagem ]"}
              </h3>
              <p className="atividades-card-descricao">
                {atividade.descricao ??
                  "[ descrição não visível na imagem — adicionar texto ]"}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="atividades-seta atividades-seta-direita"
          onClick={() => irPara(indice + 1)}
          disabled={indice === atividades.length - 1}
          aria-label="Próxima atividade"
        >
          ›
        </button>
      </div>
    </section>
  );
}
