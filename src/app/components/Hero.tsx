import "@/app/Assets/styles.css";

import { List, CaretDown } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import logoNav from "../../../public/images/logoNav.png";
import logo from "../../../public/images/logo-picnic-cosplay.png";
export default function Hero() {
  return (
    <section className="hero">
      <header className="hero-topbar">
        <Image
          src={logoNav}
          width={68}
          height={68}
          alt="ad"
          loading="eager"
          fetchPriority="high"
          className="hero-topbar-logo"
        />
        <button type="button" className="hero-menu-btn" aria-label="Abrir menu">
          <List weight="bold" />
        </button>
      </header>

      <div className="hero-content">
        <Image
          src={logo}
          width={300}
          height={300}
          alt="ad"
          loading="eager"
          fetchPriority="high"
          className="hero-logo"
        />
        <h1 className="hero-title">PICNIC COSPLAY</h1>

        <p className="hero-description">
          Entre no jogo, vista o seu manto e role a tela para conferir os
          próximos eventos que preparamos para você!
        </p>

        <a href="#programacao" className="hero-link">
          veja a nossa programação completa!
        </a>

        <a
          href="#programacao"
          className="hero-scroll-btn"
          aria-label="Ver mais"
        >
          <CaretDown weight="bold" />
        </a>
      </div>
    </section>
  );
}
