"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import "@/app/Assets/dash.css"

export default function EventPage() {
  const router = useRouter();
  return (
    <>
      <main className="Container-event">
        <header>
          <div className="box-header">
            <div className="info-header">
              <h1>Ola, {"NomeUsuário"}!</h1>
              <p>Esta é sua área exclusiva de eventos do Picnic Cosplay.</p>
            </div>
          </div>
        </header>
        <div className="box-buttonCreate" onClick={() => router.push("/dashboard/eventos/criar")}>
          <PlusIcon width={24} height={24} alt="" />
        </div>
      </main>
    </>
  );
}
