"use client";

import { useEffect, useState } from "react";
import "@/app/Assets/dash.css";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  CaretDown,
  Plus,
  CaretLeftIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
type StatusEvento = "em_andamento" | "publicado" | "encerrado";
import { EventoDoBancoType } from "@/app/services/eventos";

import {
  CalendarBlankIcon,
  CalendarDots,
  Circle,
  DotsThree,
  DotsThreeCircleIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import Loader from "@/Components/ui/Loader"

const abasFiltro: { label: string; value: "todos" | StatusEvento }[] = [
  { label: "Todos", value: "todos" },
  { label: "Em andamento", value: "em_andamento" },
  { label: "Publicados", value: "publicado" },
  { label: "Encerrados", value: "encerrado" },
];

export default function EventosPage() {
  const [abaAtiva, setAbaAtiva] = useState<"todos" | StatusEvento>("todos");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"loading" | "sucess" | "error" | "idle">(
    "idle",
  );
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [eventos, setEventos] = useState<EventoDoBancoType[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function iniciarOuvinte() {
      setStatus("loading");
      try {
        const q = query(collection(db, "eventos"));
        await delay(500)
        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            try {
              const listaFormatada = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as EventoDoBancoType[];

              setEventos(listaFormatada);
              setStatus("idle");
            } catch (erroFormatacao) {
              console.error(
                "Erro ao formatar os dados salvos:",
                erroFormatacao,
              );
              setStatus("idle");
            }
          },
          (error) => {
            console.error("Erro retornado pelo Firebase Firestore:", error);
            setStatus("idle");
          },
        );

        return unsubscribe;
      } catch (errorGeral) {
        console.error(
          "Erro crítico ao inicializar a busca de eventos:",
          errorGeral,
        );
        setStatus("idle");
      }
    }

    // Executa a nossa função blindada
    const fecharConexao = iniciarOuvinte();

    // Executa o desmonte do ouvinte ao sair do componente
    return () => {
      fecharConexao.then((unsubscribe) => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, []);

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
        <div className="eventos-lista">
          {status !== "loading" ? (
            eventos.slice(0, 3).map((evento) => (
              <div key={evento.id} onClick={() => router.push(`/dashboard/eventos/editar/${evento.id}`)} className="box-event">
                <div className="box-info">
                  <div className="boxImg">
                    <Image
                      src={evento.banner.url}
                      width={120}
                      height={120}
                      alt=""
                      loading="eager"
                    />
                  </div>
                  <div className="box-infoTitles">
                    <div className="boxtitles">
                      <div className={`status ${evento.status === ""}`}>
                        <div className="box-titleStatus">
                          <Circle
                            width={12}
                            height={12}
                            weight="fill"
                            color="green"
                          />
                          <span id="status">{evento.status}</span>
                        </div>
                      </div>
                      <div className="title">
                        <h3 id="Title">{evento.nome}</h3>
                      </div>
                    </div>
                    <div className="box-date">
                      <div className="local">
                        <MapPinIcon width={18} height={18} />
                        <p className="local">{evento.local}</p>
                      </div>
                      <div className="initialDate">
                        <CalendarBlankIcon width={18} height={18} />
                        <p id="initialDate">
                          Data:{" "}
                          {evento.periodoInicio?.toDate
                            ? evento.periodoInicio
                                .toDate()
                                .toLocaleString("pt-BR", {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })
                            : String(evento.periodoInicio || "")}
                        </p>
                      </div>
                      <div className="finalDate">
                        <CalendarDots width={18} height={18} />
                        <p id="finalDate">
                          Término:{" "}
                          {evento.periodoTermino?.toDate
                            ? evento.periodoTermino
                                .toDate()
                                .toLocaleString("pt-BR", {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })
                            : String(evento.periodoTermino || "")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-dots">
                    <DotsThree width={24} height={24} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loader status={status} />
          )}
          {status === "idle" && eventos.length === 0 ? <div className="emptyEvent">Nenhum evento criado</div> : ""}
        </div>
      </section>

      <a href="/dashboard/eventos/criar" className="eventos-fab">
        <Plus weight="bold" />
        <span>Novo evento</span>
      </a>
    </main>
  );
}
