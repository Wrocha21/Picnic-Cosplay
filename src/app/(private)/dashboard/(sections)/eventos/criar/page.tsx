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

export default function CriarEventoPage() {
  const [bannerNome, setBannerNome] = useState<string | null>(null);
  const router = useRouter();

  function handleBannerChange(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (arquivo){
      const objUrl = URL.createObjectURL(arquivo)
      
      setBannerNome(objUrl);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Integração com a API de criação de evento entra aqui.
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
              <input type="text" name="dataInicio" placeholder="Data Inicial" />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Horário de início</span>
              <input type="text" name="horaInicio" placeholder="Horário" />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Término do Evento</span>
              <input
                type="text"
                name="dataTermino"
                placeholder="Data Final"
              />
            </label>

            <label className="criar-evento-field">
              <span className="criar-evento-label">Horário de término</span>
              <input type="text" name="horaTermino" placeholder="Horário" />
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
              onChange={handleBannerChange}
            />
            <ImageIcon weight="light" />
            <span>{bannerNome ?? "Banner do Evento"}</span>
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
            Criar Evento
          </button>
        </div>
      </form>
    </main>
  );
}
