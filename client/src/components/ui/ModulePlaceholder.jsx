export default function ModulePlaceholder({ title, description, highlights }) {
  return (
    <section className="module-placeholder">
      <div className="module-placeholder__hero">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="status-card">
          <span>Status do modulo</span>
          <strong>Estrutura base pronta</strong>
          <p>Espaco preparado para formularios, listagens e acoes administrativas.</p>
        </div>
      </div>

      <div className="highlight-grid">
        {highlights.map((highlight, index) => (
          <article key={highlight} className="highlight-card">
            <span className="highlight-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>Diretriz {index + 1}</h3>
            <p>{highlight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
