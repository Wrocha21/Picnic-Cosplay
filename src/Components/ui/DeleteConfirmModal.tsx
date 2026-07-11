"use client";
import "@/app/Assets/components/deleteModal.css";
import { Warning, X } from "@phosphor-icons/react/dist/ssr";
import Loader from "./Loader";

type ConfirmDeleteModalProps = {
  status: string;
  titulo?: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export default function ConfirmDeleteModal({
  titulo = "Tem certeza?",
  mensagem,
  status,
  onConfirmar,
  onCancelar,
}: ConfirmDeleteModalProps) {
  // Fecha com a tecla Esc

  return (
    <div
      className="confirm-modal-overlay"
      role="presentation"
      onClick={onCancelar}
    >
      <div
        className="confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-titulo"
        aria-describedby="confirm-modal-mensagem"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="confirm-modal-close"
          aria-label="Fechar"
          onClick={onCancelar}
        >
          <X weight="bold" />
        </button>

        <span className="confirm-modal-icon">
          <Warning weight="fill" />
        </span>

        <h2 id="confirm-modal-titulo" className="confirm-modal-titulo">
          {titulo}
        </h2>

        <p id="confirm-modal-mensagem" className="confirm-modal-mensagem">
          {mensagem}
        </p>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="confirm-modal-btn confirm-modal-btn-cancelar"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="confirm-modal-btn confirm-modal-btn-excluir"
            onClick={onConfirmar}
          >
            {status !== "idle" ? <Loader status={status} /> : "Excluir Evento"}
          </button>
        </div>
      </div>
    </div>
  );
}
