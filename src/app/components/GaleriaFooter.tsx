import "@/app/Assets/styles.css";

const linksRapidos = [
  { label: "Início", href: "#hero" },
  { label: "Eventos", href: "#eventos" },
  { label: "Concurso Cosplay", href: "#concurso-cosplay" },
  { label: "Sobre Nós", href: "#sobre-nos" },
];

export default function GaleriaFooter() {
  return (
    <section className="galeria-footer">
      <div className="galeria-footer-borda-topo" aria-hidden="true" />

      <div className="galeria-conteudo">
        <span className="galeria-eyebrow">
          <span aria-hidden="true">✨</span> Nossa galeria <span aria-hidden="true">✨</span>
        </span>
        <p className="galeria-subtitulo">Fotos de edições anteriores</p>

        {/* Não veio um asset isolado da foto da galeria (só aparecia dentro
            do print da tela) — placeholder aqui até a foto real ser enviada. */}
        <div className="galeria-foto-placeholder">
          <span>Foto da galeria entra aqui</span>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="galeria-cta"
        >
          Veja mais no Instagram
        </a>
      </div>

      <footer className="footer">
        <div className="footer-topo">
          <div className="footer-coluna">
            <h3 className="footer-titulo">Nossas redes sociais</h3>
            <div className="footer-redes">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-rede-icone">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-rede-icone">
                FB
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="footer-rede-icone">
                TT
              </a>
            </div>
          </div>

          <div className="footer-coluna">
            <h3 className="footer-titulo">Acesso rápido</h3>
            <ul className="footer-lista">
              {linksRapidos.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-coluna footer-coluna-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-picnic-cosplay.png"
              alt="Picnic Cosplay"
              className="footer-logo"
            />
          </div>
        </div>

        <div className="footer-email">
          <h3 className="footer-titulo">Email</h3>
          <a href="mailto:picniccosplaycontato@gmail.com">picniccosplaycontato@gmail.com</a>
        </div>

        <p className="footer-copyright">
          © 2026 Picnic Cosplay • Todos os direitos reservados.
          <br />
          Desenvolvido por Wallaf Rocha
        </p>
      </footer>
    </section>
  );
}