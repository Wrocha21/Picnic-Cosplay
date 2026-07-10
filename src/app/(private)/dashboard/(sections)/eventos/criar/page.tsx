"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/app/Assets/dash.css";
import {
  Info,
  CalendarBlank,
  Image as ImageIcon,
} from "@phosphor-icons/react/dist/ssr";
import { criarEventoCompleto } from "@/app/services/eventos";
import Loader from "@/Components/ui/loader";

export default function CriarEventoPage() {
  const [bannerNome, setBannerNome] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "sucess" | "error" | "idle">(
    "idle",
  );
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const router = useRouter();

  const aoMudarImagem = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0]; // Pega o primeiro arquivo selecionado

    if (arquivo) {
      // Cria uma URL temporária da imagem local
      const urlDaImagem = URL.createObjectURL(arquivo);
      setBannerNome(urlDaImagem); // Atualiza o estado com a URL da imagem
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const arquivoBanner = formData.get("bannerInput") as File;

    const dadosDoFormulario = Object.fromEntries(formData.entries());

    const camposVazios = Object.entries(dadosDoFormulario)
      .filter(
        ([chave, valor]) =>
          valor === null || valor === undefined || String(valor).trim() === "",
      )
      .map(([chave]) => chave);

    if (camposVazios.length > 0) {
      setStatus("error");
      await delay(800);
      setStatus("idle");
      return;
    }

    try {
      setStatus("loading");
      await delay(500);

      // CHAMANDO A FUNÇÃO SEPARADA AQUI:
      await criarEventoCompleto(dadosDoFormulario, arquivoBanner);
      setStatus("sucess");
      await delay(800);
      alert("Evento criado com sucesso!");
      // reset the submitted form
      event.currentTarget.reset();
      setBannerNome(null);
    } catch (err) {
      setStatus("error");
      console.log(err);
      await delay(500);
      setStatus("idle");
    }
  }

  function handleCancelar() {
    router.push("/dashboard/eventos");
  }

  return (
    <main className="criar-evento-page">
      <form className="criar-evento-form" onSubmit={handleSubmit}>
        <section className="criar-evento-section">
          <h2 className="criar-evento-section-title">
            <Info weight="bold" />
            <span>Informações básicas</span>
          </h2>

          <label className="criar-evento-field">
            <span className="criar-evento-label">Nome do evento</span>
            <input type="text" name="nome" placeholder="Ex: Geek roteiro" />
          </label>

          <label className="criar-evento-field">
            <span className="criar-evento-label">Local do Evento</span>
            <input type="text" name="local" placeholder="Local" />
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
              <input type="date" name="dataInicio" placeholder="Data Inicial" />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Horário de início</span>
              <input type="time" name="horaInicio" placeholder="Horário" />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Término do Evento</span>
              <input type="date" name="dataTermino" placeholder="Data Final" />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Horário de término</span>
              <input type="time" name="horaTermino" placeholder="Horário" />
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
            <textarea name="descricao" placeholder="Descrição" rows={4} />
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
            {!bannerNome ? <ImageIcon weight="light" /> : "Banner do Evento" }
          </label>
        </section>

        <div className="criar-evento-footer">
          <button
            type="button"
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
            {status !== "idle" ? <Loader status={status} /> : "Criar Evento"}
          </button>
        </div>
      </form>
    </main>
  );
}
