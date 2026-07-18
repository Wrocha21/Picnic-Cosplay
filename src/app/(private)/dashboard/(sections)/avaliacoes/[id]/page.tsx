"use client";

import { useState } from "react";
import "@/app/Assets/dash.css";
import {
  UsersThree,
  Clock,
  CheckCircle,
  Trophy,
  MagnifyingGlass,
  CaretDown,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

type StatusAvaliacao = "pendente" | "em_avaliacao" | "avaliado";

const abasFiltro: { label: string; value: "todos" | StatusAvaliacao }[] = [
  { label: "Todos", value: "todos" },
  { label: "Pendentes", value: "pendente" },
  { label: "Em avaliação", value: "em_avaliacao" },
  { label: "Avaliados", value: "avaliado" },
];

export default function EventosPage() {
  const [busca, setBusca] = useState("");
  const [abaAtiva, setAbaAtiva] = useState<"todos" | StatusAvaliacao>("avaliado");
  

  return (
    <main className="jurado-page">
      <header className="jurado-header">
        <h1 className="jurado-title">Avaliações</h1>
        <p className="jurado-subtitle">
          Analise os cosplayers inscritos e registre suas notas por critério.
        </p>
      </header>

      <div className="jurado-stats">
        <div className="jurado-stat">
          <span className="jurado-stat-label">
            <UsersThree weight="bold" />
            Inscritos
          </span>
          <span className="jurado-stat-valor">{0}</span>
        </div>
        <div className="jurado-stat">
          <span className="jurado-stat-label">
            <Clock weight="bold" />
            Pendentes
          </span>
          <span className="jurado-stat-valor">{0}</span>
        </div>
        <div className="jurado-stat">
          <span className="jurado-stat-label">
            <CheckCircle weight="bold" />
            Avaliados
          </span>
          <span className="jurado-stat-valor jurado-stat-valor-avaliados">{0}</span>
        </div>
      </div>

      <div className="jurado-media-geral">
        <span className="jurado-media-geral-icon">
          <Trophy weight="fill" />
        </span>
        <div>
          <span className="jurado-media-geral-label">Média geral</span>
          <p className="jurado-media-geral-valor">
            {0} / 10 nas avaliações
            concluídas
          </p>
        </div>
      </div>

      <div className="jurado-toolbar">
        <div className="jurado-search">
          <MagnifyingGlass weight="bold" />
          <input
            type="text"
            placeholder="Buscar por cosplayer, personagem ou obra"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>
      </div>

      <div className="jurado-abas">
        {abasFiltro.map((aba) => (
          <button
            key={aba.value}
            type="button"
            className={`jurado-aba ${abaAtiva === aba.value ? "jurado-aba-ativa" : ""}`}
            onClick={() => setAbaAtiva(aba.value)}
          >
            {aba.label}
          </button>
        ))}
      </div>

      <section className="jurado-fila-section">
        <div className="jurado-fila-header">
          <div>
            <h2 className="jurado-fila-title">Fila</h2>
            <p className="jurado-fila-count">{0} cosplayers</p>
          </div>
          <button type="button" className="jurado-ordenar">
            Ordenar
            <CaretDown weight="bold" />
          </button>
        </div>

        <div className="jurado-fila-placeholder">
          <p>Nenhum concurso cosplay ativo.</p>
        </div>
      </section>

      <button type="button" className="jurado-fab">
        <Lightning weight="fill" />
        <span>Avaliar próximo</span>
      </button>
    </main>
  );
}