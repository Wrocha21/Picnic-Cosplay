import "@/app/Assets/styles.css";
import Image from "next/image";
import {
  Star,
  MapPin,
  CalendarBlank,
  CaretRight,
  GameController,
} from "@phosphor-icons/react/dist/ssr";


import capiEmpty from "../../../public/images/capivara-mascote.png";
type ProximoEvento = {
  nome: string;
  local: string;
  periodo: string;
  imagemUrl?: string;
};

// Troque por `null` pra visualizar o empty state, ou preencha
// com os dados reais vindos do Firestore quando houver um evento em destaque.
const proximoEvento: ProximoEvento | null = {
  nome: "Plaza Geek",
  local: "Rio das Ostras · RJ",
  periodo: "27/06 à 28/06",
};

export default function EventosDestaque() {
  const temEvento = Boolean(proximoEvento);

  return (
    <section className="eventos-destaque">
      <div
        className={`eventos-destaque-panel ${
          temEvento
            ? "eventos-destaque-panel-cheio"
            : "eventos-destaque-panel-vazio"
        }`}
      >
        {!temEvento && (
          <>
            <span className="eventos-destaque-badge">
              SEM EVENTO NO MOMENTO
              <Star weight="regular" />
            </span>

            <Image
              src={capiEmpty}
              width={100}
              height={100}
              alt="Estamos preparando algo épico para você! Fique ligado!"
              loading="eager"
              fetchPriority="high"
              className="eventos-destaque-mascote"
            />
          </>
        )}

        {temEvento && proximoEvento && (
          <div className="eventos-destaque-card">
            <span className="eventos-destaque-card-badge">
              <MapPin weight="fill" />
              {proximoEvento.local}
            </span>

            <div className="eventos-destaque-card-art">
              {proximoEvento.imagemUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={proximoEvento.imagemUrl} alt={proximoEvento.nome} />
              ) : (
                <GameController weight="fill" />
              )}
            </div>
          </div>
        )}
      </div>

      {temEvento && proximoEvento && (
        <div className="eventos-destaque-info">
          <h3 className="eventos-destaque-nome">{proximoEvento.nome}</h3>
          <p className="eventos-destaque-detail">
            <MapPin weight="fill" />
            <span>{proximoEvento.local}</span>
          </p>
          <p className="eventos-destaque-detail">
            <CalendarBlank weight="fill" />
            <span>{proximoEvento.periodo}</span>
          </p>
        </div>
      )}

      <div className="eventos-destaque-actions">
        <a
          href="#"
          className="eventos-destaque-btn eventos-destaque-btn-primary"
        >
          <span>SAIBA MAIS</span>
          <CaretRight weight="bold" />
        </a>
        <a
          href="#"
          className="eventos-destaque-btn eventos-destaque-btn-secondary"
        >
          <span>PRÓXIMO EVENTO</span>
          <CalendarBlank weight="fill" />
        </a>
      </div>
    </section>
  );
}
