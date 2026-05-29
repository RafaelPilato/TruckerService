import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    setErro("");
    setCarregando(true);

    try {
      const resposta = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const token = resposta.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", username);
      //localStorage.removeItem("token");
      //localStorage.removeItem("usuario");

      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        setErro("Usuário ou senha incorretos.");
      } else {
        setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
      }
    } finally {
      setCarregando(false);
    }
  }

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
            <input
              type="text"
              placeholder="Digite seu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field-group">
            <span>Senha</span>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </label>

          {erro && (
            <p style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              {erro}
            </p>
          )}

          <div className="auth-actions">
            <button
              type="button"
              className="auth-button"
              onClick={handleLogin}
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Login"}
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
