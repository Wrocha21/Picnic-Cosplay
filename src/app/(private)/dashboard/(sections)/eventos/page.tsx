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
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
type StatusEvento = "em_andamento" | "publicado" | "encerrado";
import { EventoDoBancoType } from "@/app/services/eventos";

import {
  CalendarBlankIcon,
  CalendarDots,
  Circle,
  DotsThree,
  MapPinIcon,
} from "@phosphor-icons/react";
import Loader from "@/Components/ui/Loader";
import { ContextUsers } from "@/app/Context/context";

const abasFiltro: { label: string; value: "todos" | StatusEvento }[] = [
  { label: "Todos", value: "todos" },
  { label: "Em andamento", value: "em_andamento" },
  { label: "Publicados", value: "publicado" },
  { label: "Encerrados", value: "encerrado" },
];

export default function EventosPage() {
  const [abaAtiva, setAbaAtiva] = useState<"todos" | StatusEvento>("todos");
  const [status, setStatus] = useState<"loading" | "sucess" | "error" | "idle">(
    "idle",
  );

  const [searchValue, setSearchValue] = useState("");
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [eventos, setEventos] = useState<EventoDoBancoType[]>([]);
  const router = useRouter();
    const {usuarioLogado} = ContextUsers()

  const eventosPublicados = eventos.filter(
    (evento) => evento.status === "publicado",
  );
  const eventosAoVivo = eventos.filter(
    (evento) => evento.status === "em_andamento",
  );

  const eventosFiltrados = eventos.filter((evento) => {
    const passaAba = abaAtiva === "todos" || evento.status === abaAtiva;

    // Condição da Busca: se o nome OU o local incluir o texto digitado
    const termo = searchValue.toLowerCase();
    const passaBusca =
      evento.nome.toLocaleLowerCase().includes(termo) ||
      evento.local.toLowerCase().includes(termo);

    // O evento precisa passar na ABA E na BUSCA ao mesmo tempo
    return passaAba && passaBusca;
  });

  useEffect(() => {
    if (eventos.length == 0) return;

    const checkAllEvents = async () => {
      const agora = new Date();

      const promises = eventos.map(async (evento) => {
        let newStatus = evento.status;

        const dataInicio = evento.periodoInicio?.toDate
          ? evento.periodoInicio.toDate()
          : new Date(evento.periodoInicio);
        const dataTermino = evento.periodoTermino?.toDate
          ? evento.periodoTermino.toDate()
          : new Date(evento.periodoTermino);

        if (agora >= dataInicio && agora <= dataTermino) {
          newStatus = "em_andamento";
        } else if (agora > dataTermino) {
          newStatus = "encerrado";
        } else if (agora < dataInicio) {
          newStatus = "publicado";
        }

        if (newStatus !== evento.status) {
          try {
            const docRef = doc(db, "eventos", evento.id);
            await updateDoc(docRef, { status: newStatus });
          } catch (err) {
            console.log("error ao atualizar o evento", err);
          }
        }
      });

      await Promise.all(promises);
    };

    checkAllEvents();
    const intervalo = setInterval(checkAllEvents, 60000);

    return () => clearInterval(intervalo);
  }, [eventos]);

  useEffect(() => {
    async function iniciarOuvinte() {
      setStatus("loading");
      try {
        const q = query(collection(db, "eventos"));
        await delay(500);
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
            Olá, {usuarioLogado?.userName || "carregando..."} <span aria-hidden="true">👋</span>
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
          <span className="eventos-stat-valor">{eventos.length}</span>
        </div>
        <div className="eventos-stat">
          <span className="eventos-stat-label">Ao vivo</span>
          <span className="eventos-stat-valor eventos-stat-valor-ao-vivo">
            {eventosAoVivo.length}
          </span>
        </div>
        <div className="eventos-stat">
          <span className="eventos-stat-label">Publicados</span>
          <span className="eventos-stat-valor eventos-stat-valor-publicado">
            {eventosPublicados.length}
          </span>
        </div>
      </div>

      <div className="eventos-toolbar">
        <div className="eventos-search">
          <MagnifyingGlass weight="bold" />
          <input
            value={searchValue}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar por evento ou local"
          />
        </div>
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
            <p className="eventos-lista-count">{eventosFiltrados.length} eventos</p>
          </div>
          <button type="button" className="eventos-ordenar">
            Ordenar
            <CaretDown weight="bold" />
          </button>
        </div>
        <div className="eventos-lista">
          {status !== "loading" ? (
            eventos
              .filter((evento) => {
                // Condição da Aba: se for "todos" OU o status bater
                const passaAba =
                  abaAtiva === "todos" || evento.status === abaAtiva;

                // Condição da Busca: se o nome OU o local incluir o texto digitado
                const termo = searchValue.toLowerCase();
                const passaBusca =
                  evento.nome.toLocaleLowerCase().includes(termo) ||
                  evento.local.toLowerCase().includes(termo);

                // O evento precisa passar na ABA E na BUSCA ao mesmo tempo
                return passaAba && passaBusca;
              })
              .slice(0, 3)
              .map((evento) => (
                <div
                  key={evento.id}
                  onClick={() =>
                    router.push(`/dashboard/eventos/editar/${evento.id}`)
                  }
                  className="box-event"
                >
                  <div className="box-info">
                    <div className="boxImg">
                      <Image
                        src={evento.banner.url}
                        width={120}
                        height={120}
                        alt=""
                        loading="eager"
                        fetchPriority="high"
                      />
                    </div>
                    <div className="box-infoTitles">
                      <div className="boxtitles">
                        <div
                          className={`status-${
                            evento.status === "em_andamento"
                              ? "andamento"
                              : evento.status === "encerrado"
                                ? "encerrado"
                                : "publicado"
                          }`}
                        >
                          <div className="box-titleStatus">
                            <Circle
                              size={12}
                              weight="fill"
                              color={
                                evento.status === "em_andamento"
                                  ? "#e2a216" // Cor laranja para Em Andamento
                                  : evento.status === "encerrado"
                                    ? "#f44336" // Cor vermelha para Encerrado
                                    : "#4caf50" // Cor verde padrão (publicado)
                              }
                            />
                            <span id="status">
                              {evento.status === "em_andamento"
                                ? "em andamento"
                                : evento.status}
                            </span>
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
          {status === "idle" && eventos.length === 0 ? (
            <div className="emptyEvent">Nenhum evento criado</div>
          ) : (
            ""
          )}
        </div>
      </section>

      <a href="/dashboard/eventos/criar" className="eventos-fab">
        <Plus weight="bold" />
        <span>Novo evento</span>
      </a>
    </main>
  );
}
