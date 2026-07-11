import Loader from "@/Components/ui/Loader";
import { db } from "@/firebase/config";
import { Warning } from "@phosphor-icons/react";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/Assets/components/loader.css";
import ConfirmDeleteModal from "@/Components/ui/DeleteConfirmModal";

interface propsDeleteEvent {
  idEvent: string | undefined;
  nomeEvent: string | undefined;
}

export default function DeleteEvent({ idEvent, nomeEvent }: propsDeleteEvent) {
  const [status, setStatus] = useState<"loading" | "sucess" | "error" | "idle">(
    "idle",
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const router = useRouter();
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  async function deleteEvent() {
    if (!idEvent) return;

    try {
      setStatus("loading");
      delay(1000);
      await deleteDoc(doc(db, "eventos", idEvent as string));
      setStatus("sucess");
      delay(800);
      setStatus("idle");
      router.push("/dashboard/eventos");
    } catch (error) {
      setStatus("error");
      console.log(error);
      delay(500);
      setStatus("idle");
    }
  }

  return (
    <>
      <div className="titlesExcluir">
        <span>Área de exclusão de eventos</span>
      </div>
      <div className="excluir-evento">
        <Warning
          width={33}
          height={33}
          weight="fill"
          color="red"
          alt="ExcluirEventoIcon"
        />
        <button type="button" onClick={() => setOpenDeleteModal(true)}>
            Excluir Evento
        </button>
      </div>
      {openDeleteModal && (
        <ConfirmDeleteModal
          mensagem={`Essa ação não pode ser desfeita. O evento "${nomeEvent}" será removido permanentemente.`}
          onConfirmar={deleteEvent}
          onCancelar={() => setOpenDeleteModal(false)}
          status={status}
        />
      )}
    </>
  );
}
