import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <section className="auth-layout">
      <article className="auth-card">
        <div className="auth-card__header">
          <p className="eyebrow">Acesso</p>
          <h1>Entrar no sistema</h1>
          <p>Informe suas credenciais para acessar o painel administrativo.</p>
        </div>

        <form className="auth-form">
          <label className="field-group">
            <span>Usuario</span>
            <input type="text" placeholder="Digite seu usuario" />
          </label>

          <label className="field-group">
            <span>Senha</span>
            <input type="password" placeholder="Digite sua senha" />
          </label>

          <div className="auth-actions">
            <button type="button" className="auth-button">
              Login
            </button>
          </div>
        </form>

        <p className="auth-footer">
          Ainda nao possui conta?{" "}
          <Link to="/cadastro" className="auth-link">
            Cadastre-se
          </Link>
        </p>
      </article>
    </section>
  );
}
