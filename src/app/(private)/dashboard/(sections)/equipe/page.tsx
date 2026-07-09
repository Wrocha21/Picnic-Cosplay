'use client'
import "@/app/Assets/dash.css";
import { CaretLeftIcon, MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react/dist/ssr";
import {useRouter} from "next/navigation";



export default function EquipePage() {
  const router = useRouter();
  
  return (
    <main className="equipe-page">
     

      <header className="equipe-header">
        <div className="box-titles">
        <h1 className="equipe-title">Olá {"nomeUsuario"}!</h1>
        <p className="equipe-subtitle">
          Esta é sua área de equipe do Picnic Cosplay.
        </p>

        </div>
            <CaretLeftIcon
          onClick={() => router.push("/dashboard")}
          width={33}
          height={33}
        />
      </header>

      <div className="equipe-toolbar">
        <div className="equipe-search">
          <MagnifyingGlass weight="bold" />
          <input type="text" placeholder="Busca fácil" />
        </div>
        <button type="button" className="equipe-filter-icon" aria-label="Filtrar">
          <SlidersHorizontal weight="bold" />
        </button>
      </div>

      <div className="equipe-count-row">
        <span className="equipe-count-badge">{"totalUsuarios"} Usuários</span>
      </div>

      <section className="equipe-card">
        <div className="equipe-table-header">
          <span>Nome</span>
          <span>Ação</span>
        </div>

        <ul className="equipe-list">
          
        </ul>
      </section>

      <div className="equipe-footer">
        <button type="button" className="equipe-btn equipe-btn-voltar" disabled>
          Voltar
        </button>
        <button type="button" className="equipe-btn equipe-btn-proximo">
          Próximo
        </button>
      </div>
    </main>
  );
}