import Atividades from "./components/Atividades";
import ConcursoCosplay from "./components/ConcursoCosplay";
import EventosDestaque from "./components/EventosDestaque";
import GaleriaFooter from "./components/GaleriaFooter";
import Hero from "./components/Hero";
import SobreNos from "./components/SobreNois";

export default function Home() {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <div id="eventos">
        <EventosDestaque />
      </div>
      <Atividades />
      <div id="concurso-cosplay">
        <ConcursoCosplay />
      </div>
      <div id="sobre-nos">
        <SobreNos />
      </div>
      <GaleriaFooter />
    </>
  );
}
