import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MecanicosPage.css";

// Instância do axios já com o token JWT no header
// Toda requisição feita por "api" vai autenticada automaticamente
const api = axios.create({
  headers: {
    get Authorization() {
      return `Bearer ${localStorage.getItem("token")}`;
    },
  },
});

export default function MecanicosPage() {
  const [mecanicos, setMecanicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [salvando, setSalvando] = useState(false);

  // Busca todos os mecânicos ao abrir a página
  useEffect(() => {
    buscarMecanicos();
  }, []);

  async function buscarMecanicos() {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await api.get("/api/mecanico");
      setMecanicos(resposta.data);
    } catch {
      setErro("Não foi possível carregar os mecânicos. Verifique se o backend está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  // --- Modal ---
  function abrirModalNovo() {
    setIdEdicao(null);
    setNome("");
    setCpf("");
    setModalAberto(true);
  }

  function abrirModalEdicao(mecanico) {
    setIdEdicao(mecanico.id);
    setNome(mecanico.nome);
    setCpf(mecanico.cpf);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setNome("");
    setCpf("");
    setIdEdicao(null);
  }

  // --- Máscara de CPF ---
  function handleCpf(e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    setCpf(valor);
  }

  // --- Salvar (criar ou editar) ---
  async function salvarMecanico() {
    if (!nome.trim() || !cpf.trim()) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    if (cpf.length < 14) {
      alert("Por favor, insira um CPF válido!");
      return;
    }

    setSalvando(true);
    try {
      if (idEdicao !== null) {
        // PUT /api/mecanico/{id}
        await api.put(`/api/mecanico/${idEdicao}`, { id: idEdicao, nome, cpf });
      } else {
        // POST /api/mecanico
        await api.post("/api/mecanico", { nome, cpf });
      }

      await buscarMecanicos(); // Atualiza a lista com os dados do banco
      fecharModal();
    } catch {
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  // --- Deletar ---
  async function deletarMecanico(id) {
    if (!window.confirm("Tem certeza que deseja excluir este mecânico?")) return;

    try {
      // DELETE /api/mecanico/{id}
      await api.delete(`/api/mecanico/${id}`);
      await buscarMecanicos();
    } catch {
      alert("Erro ao excluir. Tente novamente.");
    }
  }

  return (
    <div className="mec-container">
      {/* Topo */}
      <div className="mec-topo">
        <div className="mec-titulo-secao">
          <h1>Mecânicos</h1>
          <p>Gerencie a equipe de especialistas da sua oficina</p>
        </div>
        <button onClick={abrirModalNovo} className="mec-btn-principal">
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>

      {/* Feedback de erro na busca */}
      {erro && <p className="mec-erro">{erro}</p>}

      {/* Tabela */}
      <div className="mec-tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Profissional</th>
              <th>CPF</th>
              <th className="mec-text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {carregando ? (
              <tr>
                <td colSpan={4} className="mec-vazio">Carregando...</td>
              </tr>
            ) : mecanicos.length === 0 ? (
              <tr>
                <td colSpan={4} className="mec-vazio">
                  Nenhum mecânico cadastrado no momento.
                </td>
              </tr>
            ) : (
              mecanicos.map((mecanico) => (
                <tr key={mecanico.id}>
                  <td>#{String(mecanico.id).padStart(2, "0")}</td>
                  <td className="mec-nome-mecanico">
                    <div className="mec-avatar">
                      {mecanico.nome.charAt(0).toUpperCase()}
                    </div>
                    {mecanico.nome}
                  </td>
                  <td>{mecanico.cpf}</td>
                  <td>
                    <div className="mec-acoes">
                      <button
                        onClick={() => abrirModalEdicao(mecanico)}
                        className="mec-btn-acao mec-edit"
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => deletarMecanico(mecanico.id)}
                        className="mec-btn-acao mec-delete"
                        title="Excluir"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="mec-modal" onClick={fecharModal}>
          <div className="mec-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="mec-modal-header">
              <h2>{idEdicao !== null ? "Editar Mecânico" : "Novo Mecânico"}</h2>
              <button onClick={fecharModal} className="mec-btn-fechar-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="mec-modal-body">
              <div className="mec-input-group">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Ex: Luis Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="mec-input-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCpf}
                />
              </div>
            </div>

            <div className="mec-modal-footer">
              <button onClick={fecharModal} className="mec-btn-cancelar">
                Cancelar
              </button>
              <button onClick={salvarMecanico} className="mec-btn-salvar" disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar Cadastro"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
