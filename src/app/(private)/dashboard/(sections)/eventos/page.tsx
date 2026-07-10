"use client";

import { useState } from "react";
import "@/app/Assets/dash.css";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  CaretDown,
  Plus,
  CaretLeftIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

type StatusEvento = "em_andamento" | "publicado" | "encerrado";

const abasFiltro: { label: string; value: "todos" | StatusEvento }[] = [
  { label: "Todos", value: "todos" },
  { label: "Em andamento", value: "em_andamento" },
  { label: "Publicados", value: "publicado" },
  { label: "Encerrados", value: "encerrado" },
];

export default function EventosPage() {
  const [abaAtiva, setAbaAtiva] = useState<"todos" | StatusEvento>("todos");
  const router = useRouter();
  return (
    <main className="eventos-page">
      <header className="eventos-header">
        <div className="box-info">
          <h1 className="eventos-title">
            Olá, {"nomeUsuario"} <span aria-hidden="true">👋</span>
          </h1>
          <span className="eventos-subtitle">
            Esta é sua área exclusiva de eventos do Picnic Cosplay.
          </span>
        </div>
        <CaretLeftIcon
          onClick={() => router.push("/dashboard")}
          width={33}
          height={33}
        />
      </header>

      <div className="eventos-stats">
        <div className="eventos-stat">
          <span className="eventos-stat-label">Total</span>
          <span className="eventos-stat-valor">0</span>
        </div>
        <div className="eventos-stat">
          <span className="eventos-stat-label">Ao vivo</span>
          <span className="eventos-stat-valor eventos-stat-valor-ao-vivo">
            0
          </span>
        </div>
        <div className="eventos-stat">
          <span className="eventos-stat-label">Publicados</span>
          <span className="eventos-stat-valor eventos-stat-valor-publicado">
            0
          </span>
        </div>
      </div>

      <div className="eventos-toolbar">
        <div className="eventos-search">
          <MagnifyingGlass weight="bold" />
          <input type="text" placeholder="Buscar por evento ou local" />
        </div>
        <button
          type="button"
          className="eventos-filter-icon"
          aria-label="Filtrar"
        >
          <SlidersHorizontal weight="bold" />
        </button>
      </div>

      <div className="eventos-abas">
        {abasFiltro.map((aba) => (
          <button
            key={aba.value}
            type="button"
            className={`eventos-aba ${abaAtiva === aba.value ? "eventos-aba-ativa" : ""}`}
            onClick={() => setAbaAtiva(aba.value)}
          >
            {aba.label}
          </button>
        ))}
      </div>

      <section className="eventos-lista-section">
        <div className="eventos-lista-header">
          <div>
            <h2 className="eventos-lista-title">Eventos criados</h2>
            <p className="eventos-lista-count">0 eventos</p>
          </div>
          <button type="button" className="eventos-ordenar">
            Ordenar
            <CaretDown weight="bold" />
          </button>
        </div>
      </section>

      <a href="/dashboard/eventos/criar" className="eventos-fab">
        <Plus weight="bold" />
        <span>Novo evento</span>
      </a>
    </main>
  );
}
