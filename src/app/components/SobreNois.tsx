import "@/app/Assets/styles.css";

export default function SobreNos() {
  return (
    <section className="sobre-nos">
      <div className="sobre-nos-borda sobre-nos-borda-topo" aria-hidden="true" />

      <div className="sobre-nos-conteudo">
        <h2 className="sobre-nos-titulo">SOBRE NOIS</h2>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-picnic-cosplay.png"
          alt="Picnic Cosplay"
          className="sobre-nos-logo"
        />

        <p className="sobre-nos-texto">
          O Picnic Cosplay nasceu em{" "}
          <strong className="sobre-nos-destaque">abril de 2022</strong> no
          icônico Caminho Niemeyer, em Niterói, reunindo{" "}
          <strong className="sobre-nos-destaque">mais de 40 cosplayers</strong>{" "}
          em um encontro marcado pela criatividade e pelo amor à cultura geek.
          Desde sua origem, o projeto foi idealizado como um movimento
          democrático, promovendo encontros acessíveis e inclusivos para fãs
          de todas as idades.
        </p>
      </div>

      <div className="sobre-nos-borda sobre-nos-borda-base" aria-hidden="true" />
    </section>
  );
}