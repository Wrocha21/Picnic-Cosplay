import "@/app/Assets/styles.css";

export default function ConcursoCosplay() {
  return (
    <section className="concurso-cosplay">
      <div className="concurso-cosplay-imagem">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/cosplayer.png" alt="Cosplayer premiado no Picnic Cosplay" />
      </div>

      <div className="concurso-cosplay-conteudo">
        <h2 className="concurso-cosplay-titulo">Concurso Cosplay</h2>
        {/* Texto reaproveitado do card "Concurso Cosplays" da seção Atividades —
            não veio nenhuma referência de layout específica pra esta seção além
            da foto, então optei por reaproveitar a copy real já existente. */}
        <p className="concurso-cosplay-descricao">
          Se você ama interpretar, desfilar e dar vida aos seus personagens, esse
          é o seu momento 👑💃
        </p>
        <a href="#inscricao" className="concurso-cosplay-cta">
          Inscreva-se
        </a>
      </div>
    </section>
  );
}