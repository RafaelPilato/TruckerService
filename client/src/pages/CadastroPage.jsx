import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CadastroPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    setErro("");

    if (!username.trim() || !password.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (password !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      await axios.post("/api/auth", {
        username,
        password,
      });

      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setErro("Este nome de usuário já está em uso.");
      } else {
        setErro("Erro ao cadastrar. Verifique se o backend está rodando.");
      }
    } finally {
      setCarregando(false);
    }
  }

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
            <input
              type="text"
              placeholder="Escolha um nome de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field-group">
            <span>Senha</span>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="field-group">
            <span>Confirmar senha</span>
            <input
              type="password"
              placeholder="Repita a senha criada"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCadastro()}
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
              onClick={handleCadastro}
              disabled={carregando}
            >
              {carregando ? "Cadastrando..." : "Cadastrar"}
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
