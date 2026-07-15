"use client";
import { auth } from "@/firebase/config";
import {
  CaretLeftIcon,
  CaretRight,
  ClipboardText,
  GearSix,
  UsersThree,
} from "@phosphor-icons/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import "@/app/Assets/dash.css";
import { ContextUsers } from "@/app/Context/context";

type DashboardCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const cards: DashboardCard[] = [
  {
    title: "Área do Jurado",
    description: "Avalie os competidores do evento",
    href: "/dashboard/jurado",
    icon: <ClipboardText weight="bold" />,
  },
  {
    title: "Equipe",
    description: "Membros da equipe",
    href: "/dashboard/equipe",
    icon: <UsersThree weight="bold" />,
  },
  {
    title: "Área de Eventos",
    description: "Gerenciar cronogramas e inscrições",
    href: "/dashboard/eventos",
    icon: <ClipboardText weight="bold" />,
  },
  {
    title: "Área de Gestão",
    description: "Sessão Administrativa",
    href: "/dashboard/gestao",
    icon: <GearSix weight="bold" />,
  },
];

export default function Dashboard() {
  const router = useRouter();
  async function HandleSignOut() {
    try {
      await signOut(auth);

      // DELEÇÃO CORRETA: Passando todas as flags que aparecem no seu print do DevTools
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure;";

      // Força o recarregamento total para limpar o cache do Next.js
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  const {usuarioLogado} = ContextUsers()

  return (
    <>
    <p onClick={HandleSignOut}>Deslogar</p>
      <main className="dashboard-page">
        <header className="dashboard-header">
          <div className="box-titles">
            <h1 className="dashboard-title">Olá, {usuarioLogado?.userName || "carregando"}!</h1>
            <p className="dashboard-subtitle">
              Onde será o próximo evento hoje?
            </p>
          </div>
          
        </header>

        <section className="dashboard-grid" aria-label="Áreas do dashboard">
          {cards.map((card) => (
            <a key={card.title} href={card.href} className="dashboard-card">
              <span className="dashboard-icon-wrapper">{card.icon}</span>
              <div className="dashboard-card-body">
                <h2 className="dashboard-card-title">{card.title}</h2>
                <p className="dashboard-card-description">{card.description}</p>
              </div>
              <span className="dashboard-chevron" aria-hidden="true">
                <CaretRight weight="bold" />
              </span>
            </a>
          ))}
        </section>
      </main>
    </>
  );
}
