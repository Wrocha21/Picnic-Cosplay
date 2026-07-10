'use client'

import "@/app/Assets/dash.css";
import {
  MagnifyingGlass,
  CaretDown,
  CalendarX,
  CaretLeftIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
function EmptyState() {
  return (
    <div className="eventos-empty-state">
      <span className="eventos-empty-icon">
        <CalendarX weight="bold" />
      </span>
      <p className="eventos-empty-text">Nenhum evento criado.</p>
    </div>
  );
}

export default function EventosPage() {
  const router = useRouter();

  return (
    <main className="eventos-page">
      <header className="eventos-header">
        <div className="box-titles">
          <h1 className="eventos-title">Olá {"nomeUsuario"}!</h1>
          <p className="eventos-subtitle">
            Esta é sua área exclusiva de jurado do Picnic Cosplay.
          </p>
        </div>
        <CaretLeftIcon
          onClick={() => router.push("/dashboard")}
          width={33}
          height={33}
        />
      </header>

      <div className="eventos-toolbar">
        <div className="eventos-search">
          <MagnifyingGlass weight="bold" />
          <input type="text" placeholder="Busca fácil" />
        </div>
        <select className="eventos-filter" name="category-select" id="categories">
          <option value="tradicional">Adulto</option>
          <option value="cospop">Cospop</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <section className="eventos-card">
        <div className="eventos-table-header">
          <span className="eventos-col eventos-col-nome">Nome</span>
          <span className="eventos-col eventos-col-cosplay">Cosplay</span>
          <span className="eventos-col eventos-col-categoria">Categoria</span>
          <span className="eventos-col eventos-col-nota">Nota</span>
        </div>

        <EmptyState />
      </section>

      <p className="eventos-counter">0/0</p>

      <section className="eventos-card eventos-referencia-card">
        <h2 className="eventos-referencia-title">Referência do personagem</h2>
        <EmptyState />
      </section>
    </main>
  );
}
