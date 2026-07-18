"use client";
import "@/app/Assets/dash.css";
import { ContextUsers } from "@/app/Context/context";
import Loader from "@/Components/ui/Loader";
import { auth } from "@/firebase/config";
import { DotsThree } from "@phosphor-icons/react";
import {
  CaretLeftIcon,
  MagnifyingGlass,
  SlidersHorizontal,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export default function EquipePage() {
  const router = useRouter();
  const { usuarioLogado, usuarios, statusContext } = ContextUsers();

  return (
    <main className="equipe-page">
      <header className="equipe-header">
        <div className="box-titles">
          <h1 className="equipe-title">
            Olá {usuarioLogado?.userName || "carregando..."}!
          </h1>
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
     
      </div>

      <div className="equipe-count-row">
        <span className="equipe-count-badge">{usuarios.length} Usuários</span>
      </div>

      <section className="equipe-card">
        <div className="equipe-table-header">
          <span>Nome</span>
          <span>Ação</span>
        </div>

        <ul className="equipe-list">
          {statusContext !== "idle" ? (
            <div className="box-loader">
              <Loader status={statusContext} />
            </div>
          ) : (
            <div className="box-equipe">
              {usuarios.map((user) => {
                return (
                  <li key={user.uid} className="box-user">
                    <div className="box-info">
                      <span>
                        {`${user.userName}`}
                        {user.uid === auth.currentUser?.uid ? (
                          <span id="you">( você )</span>
                        ) : (
                          ""
                        )}
                      </span>
                      <p>{user.role}</p>
                    </div>
                    <div className="box-dots">
                      <DotsThree size={24} />
                    </div>
                  </li>
                );
              })}
            </div>
          )}
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
