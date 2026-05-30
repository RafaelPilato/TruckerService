import { useEffect, useState } from "react";
import api from "../services/api";

export default function OrdensServicoPage() {
  const [ordens, setOrdens] = useState([]);
  const [caminhoes, setCaminhoes] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);

  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [descricaoProblema, setDescricaoProblema] = useState("");
  const [caminhaoId, setCaminhaoId] = useState("");
  const [mecanicoId, setMecanicoId] = useState("");

  const [mecanicoFinalizacaoId, setMecanicoFinalizacaoId] = useState("");
  const [descricaoServicoRealizado, setDescricaoServicoRealizado] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setErro("");

      const respostaOrdens = await api.get("/ordemservico");
      const respostaCaminhoes = await api.get("/caminhao");
      const respostaMecanicos = await api.get("/mecanico");

      setOrdens(respostaOrdens.data);
      setCaminhoes(respostaCaminhoes.data);
      setMecanicos(respostaMecanicos.data);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar dados. Faça login e verifique se o backend está rodando.");
    }
  }

  async function abrirOrdemServico() {
    try {
      setMensagem("");
      setErro("");

      if (!titulo || !descricaoProblema || !caminhaoId) {
        setErro("Preencha título, descrição do problema e caminhão.");
        return;
      }

      const novaOrdem = {
        titulo: titulo,
        descricaoProblema: descricaoProblema,
        caminhaoId: Number(caminhaoId),
        mecanicoId: mecanicoId ? Number(mecanicoId) : null,
      };

      await api.post("/ordemservico", novaOrdem);

      setTitulo("");
      setDescricaoProblema("");
      setCaminhaoId("");
      setMecanicoId("");

      setMensagem("Ordem de serviço aberta com sucesso.");
      await carregarDados();
    } catch (error) {
      console.error(error);
      setErro("Erro ao abrir ordem de serviço.");
    }
  }

  async function finalizarOrdemServico() {
    try {
      setMensagem("");
      setErro("");

      if (!ordemSelecionada) {
        setErro("Selecione uma ordem de serviço.");
        return;
      }

      if (!mecanicoFinalizacaoId || !descricaoServicoRealizado) {
        setErro("Informe o mecânico e a descrição do serviço realizado.");
        return;
      }

      /*
        Importante:
        O backend espera um objeto OrdemServico.
        Por isso enviamos os campos principais da OS junto com os dados de fechamento.
        Isso evita o erro 400 Bad Request.
      */
      const dadosFinalizacao = {
        id: ordemSelecionada.id,
        titulo: ordemSelecionada.titulo,
        descricaoProblema: ordemSelecionada.descricaoProblema,
        caminhaoId: ordemSelecionada.caminhaoId,
        mecanicoId: Number(mecanicoFinalizacaoId),
        dataHoraFechamento: new Date().toISOString(),
        descricaoServicoRealizado: descricaoServicoRealizado,
      };

      await api.put(
        `/ordemservico/${ordemSelecionada.id}/finalizar`,
        dadosFinalizacao
      );

      setMecanicoFinalizacaoId("");
      setDescricaoServicoRealizado("");
      setOrdemSelecionada(null);

      setMensagem("Ordem de serviço finalizada com sucesso.");
      await carregarDados();
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setErro(String(error.response.data));
      } else {
        setErro("Erro ao finalizar ordem de serviço.");
      }
    }
  }

  function selecionarOrdem(ordem) {
    setOrdemSelecionada(ordem);

    if (ordem.mecanicoId) {
      setMecanicoFinalizacaoId(String(ordem.mecanicoId));
    } else {
      setMecanicoFinalizacaoId("");
    }

    setDescricaoServicoRealizado("");
    setMensagem("");
    setErro("");
  }

  function formatarStatus(status) {
    if (status === 0) return "Aberta";
    if (status === 1) return "Finalizada";
    return status;
  }

  function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleString("pt-BR");
  }

  return (
    <section className="os-page">
      <div className="module-header">
        <p className="eyebrow">Core do sistema</p>
        <h1>Ordens de Serviço</h1>
        <p>
          Abra, acompanhe e finalize manutenções vinculando caminhões e mecânicos.
        </p>
      </div>

      {mensagem && <p className="success-message">{mensagem}</p>}
      {erro && <p className="error-message">{erro}</p>}

      <div className="os-grid">
        <article className="os-card">
          <h2>Abrir OS</h2>

          <label className="field-group">
            <span>Título</span>
            <input
              type="text"
              placeholder="Ex: Troca de óleo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </label>

          <label className="field-group">
            <span>Caminhão</span>
            <select
              value={caminhaoId}
              onChange={(e) => setCaminhaoId(e.target.value)}
            >
              <option value="">Selecione um caminhão</option>

              {caminhoes.map((caminhao) => (
                <option key={caminhao.id} value={caminhao.id}>
                  {caminhao.placa} - {caminhao.marca} {caminhao.modelo}
                </option>
              ))}
            </select>
          </label>

          <label className="field-group">
            <span>Mecânico inicial</span>
            <select
              value={mecanicoId}
              onChange={(e) => setMecanicoId(e.target.value)}
            >
              <option value="">Sem mecânico no momento</option>

              {mecanicos.map((mecanico) => (
                <option key={mecanico.id} value={mecanico.id}>
                  {mecanico.nome} - CPF: {mecanico.cpf}
                </option>
              ))}
            </select>
          </label>

          <label className="field-group">
            <span>Descrição do problema</span>
            <textarea
              placeholder="Descreva o problema apresentado pelo caminhão"
              value={descricaoProblema}
              onChange={(e) => setDescricaoProblema(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="auth-button"
            onClick={abrirOrdemServico}
          >
            Abrir Ordem de Serviço
          </button>
        </article>

        <article className="os-card">
          <h2>Listagem de OS</h2>

          {ordens.length === 0 ? (
            <p className="empty-message">Nenhuma ordem de serviço cadastrada.</p>
          ) : (
            <div className="os-list">
              {ordens.map((ordem) => (
                <button
                  key={ordem.id}
                  type="button"
                  className={
                    ordemSelecionada?.id === ordem.id
                      ? "os-item os-item--active"
                      : "os-item"
                  }
                  onClick={() => selecionarOrdem(ordem)}
                >
                  <strong>
                    #{ordem.id} - {ordem.titulo}
                  </strong>

                  <span>Status: {formatarStatus(ordem.status)}</span>

                  <span>
                    Caminhão:{" "}
                    {ordem.veiculo
                      ? `${ordem.veiculo.placa} - ${ordem.veiculo.modelo}`
                      : "Não informado"}
                  </span>

                  <span>
                    Mecânico:{" "}
                    {ordem.mecanico
                      ? ordem.mecanico.nome
                      : "Não informado"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </article>
      </div>

      {ordemSelecionada && (
        <article className="os-card os-detail">
          <h2>Detalhes da OS #{ordemSelecionada.id}</h2>

          <div className="os-detail-grid">
            <p>
              <strong>Título:</strong> {ordemSelecionada.titulo}
            </p>

            <p>
              <strong>Status:</strong> {formatarStatus(ordemSelecionada.status)}
            </p>

            <p>
              <strong>Caminhão:</strong>{" "}
              {ordemSelecionada.veiculo
                ? `${ordemSelecionada.veiculo.placa} - ${ordemSelecionada.veiculo.marca} ${ordemSelecionada.veiculo.modelo}`
                : "Não informado"}
            </p>

            <p>
              <strong>Mecânico:</strong>{" "}
              {ordemSelecionada.mecanico
                ? ordemSelecionada.mecanico.nome
                : "Não informado"}
            </p>

            <p>
              <strong>Data de abertura:</strong>{" "}
              {formatarData(ordemSelecionada.dataHoraAbertura)}
            </p>

            <p>
              <strong>Data de fechamento:</strong>{" "}
              {formatarData(ordemSelecionada.dataHoraFechamento)}
            </p>
          </div>

          <div className="os-text-block">
            <strong>Problema relatado:</strong>
            <p>{ordemSelecionada.descricaoProblema}</p>
          </div>

          <div className="os-text-block">
            <strong>Serviço realizado:</strong>
            <p>
              {ordemSelecionada.descricaoServicoRealizado ||
                "Esta OS ainda não foi finalizada."}
            </p>
          </div>

          {ordemSelecionada.status === 0 && (
            <div className="os-finalizar">
              <h3>Finalizar Ordem de Serviço</h3>

              <label className="field-group">
                <span>Mecânico responsável</span>
                <select
                  value={mecanicoFinalizacaoId}
                  onChange={(e) => setMecanicoFinalizacaoId(e.target.value)}
                >
                  <option value="">Selecione um mecânico</option>

                  {mecanicos.map((mecanico) => (
                    <option key={mecanico.id} value={mecanico.id}>
                      {mecanico.nome} - CPF: {mecanico.cpf}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-group">
                <span>Descrição do serviço realizado</span>
                <textarea
                  placeholder="Descreva o serviço feito no caminhão"
                  value={descricaoServicoRealizado}
                  onChange={(e) =>
                    setDescricaoServicoRealizado(e.target.value)
                  }
                />
              </label>

              <button
                type="button"
                className="auth-button"
                onClick={finalizarOrdemServico}
              >
                Finalizar OS
              </button>
            </div>
          )}

          {ordemSelecionada.status === 1 && (
            <p className="success-message">
              Esta ordem de serviço já foi finalizada.
            </p>
          )}
        </article>
      )}
    </section>
  );
}