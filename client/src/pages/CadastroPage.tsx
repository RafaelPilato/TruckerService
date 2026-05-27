import { Link } from "react-router-dom";

export default function CadastroPage() {
  return (
    <section className="auth-layout">
      <article className="auth-card">
        <div className="auth-card__header">
          <p className="eyebrow">Cadastro</p>
          <h1>Criar conta</h1>
          <p>Preencha os dados abaixo para criar um novo acesso ao sistema.</p>
        </div>

        <form className="auth-form">
          <label className="field-group">
            <span>Usuario</span>
            <input type="text" placeholder="Escolha um nome de usuario" />
          </label>

          <label className="field-group">
            <span>Senha</span>
            <input type="password" placeholder="Crie uma senha" />
          </label>

          <label className="field-group">
            <span>Confirmar senha</span>
            <input type="password" placeholder="Repita a senha criada" />
          </label>

          <div className="auth-actions">
            <button type="button" className="auth-button">
              Cadastrar
            </button>
          </div>
        </form>

        <p className="auth-footer">
          Ja possui conta?{" "}
          <Link to="/login" className="auth-link">
            Faca login
          </Link>
        </p>
      </article>
    </section>
  );
}
