import { Link } from "react-router-dom";

const modules = [
  {
    title: "Caminhoes",
    copy: "Estruture o cadastro da frota e prepare a base para as proximas telas de manutencao.",
    to: "/caminhoes",
  },
  {
    title: "Mecanicos",
    copy: "Reserve um espaco claro para a equipe da oficina e a evolucao dos formularios.",
    to: "/mecanicos",
  },
  {
    title: "Ordens de servico",
    copy: "Centralize o fluxo operacional com uma navegacao preparada para historico e fechamento.",
    to: "/ordens-servico",
  },
];

export default function DashboardPage() {
  return (
    <section className="dashboard-grid dashboard-grid--home">
      <section className="module-grid module-grid--home">
        {modules.map((module) => (
          <article key={module.to} className="module-card">
            <h3>{module.title}</h3>
            <p>{module.copy}</p>
            <Link to={module.to} className="module-card__link">
              Acessar
            </Link>
          </article>
        ))}
      </section>
    </section>
  );
}
