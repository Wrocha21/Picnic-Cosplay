"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import "@/app/Assets/dash.css";
import {
  Info,
  CalendarBlank,
  Image as ImageIcon,
} from "@phosphor-icons/react/dist/ssr";
import { editarEventoCompleto } from "@/app/services/eventos";
import Loader from "@/Components/ui/Loader";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Warning } from "@phosphor-icons/react";
import DeleteEvent from "@/app/(private)/dashboard/Components/Delete-event";

type FirestoreTimestamp = {
  toDate: () => Date;
};

type EventoOriginal = {
  id?: string;
  nome?: string;
  local?: string;
  descricao?: string;
  periodoInicio?: FirestoreTimestamp | null;
  periodoTermino?: FirestoreTimestamp | null;
  banner?: { url?: string } | null;
};

export default function EditarEventoPage() {
  const [bannerNome, setBannerNome] = useState<string | null>(null);
  const [bannerArquivo, setBannerArquivo] = useState<File | null>(null);
  const [status, setStatus] = useState<"loading" | "sucess" | "error" | "idle">(
    "idle",
  );
  const [formKey, setFormKey] = useState(0);
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const router = useRouter();

  const aoMudarImagem = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0]; // Pega o primeiro arquivo selecionado

    if (arquivo) {
      setBannerArquivo(arquivo);
      // Cria uma URL temporária da imagem local
      const urlDaImagem = URL.createObjectURL(arquivo);
      setBannerNome(urlDaImagem); // Atualiza o estado com a URL da imagem
    }
  };
  // --- Conversores para o PERÍODO DE INÍCIO ---
  const obterDataInicio = () => {
    if (!eventoOriginal?.periodoInicio?.toDate) return "";
    // Converte para Date e extrai apenas "AAAA-MM-DD"
    return eventoOriginal.periodoInicio.toDate().toISOString().split("T")[0];
  };

  const obterHoraInicio = () => {
    if (!eventoOriginal?.periodoInicio?.toDate) return "";
    const d = eventoOriginal.periodoInicio.toDate();
    // Garante o formato de dois dígitos "HH:MM"
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  // --- Conversores para o PERÍODO DE TÉRMINO ---
  const obterDataTermino = () => {
    if (!eventoOriginal?.periodoTermino?.toDate) return "";
    return eventoOriginal.periodoTermino.toDate().toISOString().split("T")[0];
  };

  const obterHoraTermino = () => {
    if (!eventoOriginal?.periodoTermino?.toDate) return "";
    const d = eventoOriginal.periodoTermino.toDate();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const { id } = useParams(); // Pega o ID da URL

  const [eventoOriginal, setEventoOriginal] = useState<EventoOriginal>();

  useEffect(() => {
    async function carregarDadosIniciais() {
      if (!id) return;
      setStatus("loading");

      try {
        const docRef = doc(db, "eventos", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dados = docSnap.data();
          setEventoOriginal(dados);

          // Se já houver um banner, joga na tela para exibição
          if (dados.banner?.url) {
            setBannerNome(dados.banner.url);
          }
        } else {
          alert("Evento não encontrado!");
          router.push("/dashboard/eventos");
        }
      } catch (error) {
        console.error("Erro ao carregar dados do evento:", error);
      } finally {
        setStatus("idle");
      }
    }

    carregarDadosIniciais();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dadosDoFormulario = Object.fromEntries(formData.entries());

    try {
      setStatus("loading");
      await delay(500);

      const dadosCompletos = {
        ...dadosDoFormulario,
        bannerUrlAntiga: eventoOriginal?.banner?.url || "", // Garante que a variável vinda do teu useEffect com getDoc entra aqui
      };
      // Passa o id como primeiro parâmetro
      await editarEventoCompleto(
        id as string,
        dadosCompletos,
        bannerArquivo || undefined,
      );
      setStatus("sucess");
      await delay(500);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      console.error(error);
      await delay(800);
      setStatus("idle");
    }
  }

  function handleCancelar() {
    router.push("/dashboard/eventos");
  }
  // 2. Avisa caso o Firebase tenha retornado vazio ou o id não bata com nenhum documento

  return (
    <main className="criar-evento-page">
      <form key={formKey} className="criar-evento-form" onSubmit={handleSubmit}>
        <section className="criar-evento-section">
          <h2 className="criar-evento-section-title">
            <Info weight="bold" />
            <span>Informações básicas</span>
          </h2>

          <label className="criar-evento-field">
            <span className="criar-evento-label">Nome do evento</span>
            <input
              type="text"
              defaultValue={eventoOriginal?.nome}
              name="nome"
              placeholder="Ex: Geek roteiro"
            />
          </label>

          <label className="criar-evento-field">
            <span className="criar-evento-label">Local do Evento</span>
            <input
              type="text"
              defaultValue={eventoOriginal?.local}
              name="local"
              placeholder="Local"
            />
          </label>
        </section>

        <section className="criar-evento-section">
          <h2 className="criar-evento-section-title">
            <CalendarBlank weight="bold" />
            <span>Período do Evento</span>
          </h2>

          <div className="criar-evento-grid">
            <label className="criar-evento-field">
              <span className="criar-evento-label">Início do Evento</span>
              <input
                type="date"
                defaultValue={obterDataInicio()}
                name="dataInicio"
                placeholder="Data Inicial"
              />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Horário de início</span>
              <input
                type="time"
                name="horaInicio"
                placeholder="Horário"
                defaultValue={obterHoraInicio()}
              />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Término do Evento</span>
              <input
                type="date"
                name="dataTermino"
                defaultValue={obterDataTermino()}
                placeholder="Data Final"
              />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Horário de término</span>
              <input
                type="time"
                defaultValue={obterHoraTermino()}
                name="horaTermino"
                placeholder="Horário"
              />
            </label>
          </div>
        </section>

        <section className="criar-evento-section">
          <h2 className="criar-evento-section-title">
            <ImageIcon weight="bold" />
            <span>Banner do Evento</span>
          </h2>

          <label className="criar-evento-field">
            <span className="criar-evento-label">Descrição do Evento</span>
            <textarea
              name="descricao"
              defaultValue={eventoOriginal?.descricao}
              placeholder="Descrição"
              rows={4}
            />
          </label>

          <label className="criar-evento-dropzone">
            {bannerNome && (
              <Image
                src={bannerNome}
                width={200}
                height={200}
                alt="Banner do Evento"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="criar-evento-dropzone-input"
              name="bannerInput"
              onChange={aoMudarImagem}
            />
            {!bannerNome ? <ImageIcon weight="light" /> : "Banner do Evento"}
          </label>
        </section>

        <div className="criar-evento-footer">
          <button
            type="submit"
            className="criar-evento-btn criar-evento-btn-cancelar"
            onClick={handleCancelar}
          >
            Voltar
          </button>
          <button
            type="submit"
            className="criar-evento-btn criar-evento-btn-criar"
          >
            {" "}
            {status !== "idle" ? (
              <Loader status={status} />
            ) : (
              "Salvar Alterações"
            )}
          </button>
        </div>
        <DeleteEvent
          idEvent={eventoOriginal?.id}
          nomeEvent={eventoOriginal?.nome}
        />
      </form>
    </main>
  );
}
