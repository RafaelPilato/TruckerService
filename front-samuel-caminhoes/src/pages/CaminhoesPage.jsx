import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Truck, Plus, Search, Edit2, Trash2, X } from 'lucide-react';

export default function CaminhoesPage({ onNotify }) {
  // --- ESTADOS DA APLICAÇÃO ---
  const [caminhoes, setCaminhoes] = useState([]); // Lista completa de caminhões
  const [search, setSearch] = useState(''); // Texto de busca da barra de pesquisa
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a abertura do modal
  const [editingId, setEditingId] = useState(null); // ID do caminhão sendo editado (null se for um novo cadastro)
  
  // Estado que armazena os valores digitados no formulário
  const [form, setForm] = useState({
    placa: '',
    chassi: '',
    marca: '',
    modelo: '',
    ano: new Date().getFullYear()
  });

  // --- CARREGAMENTO DE DADOS ---
  // Busca a lista de caminhões do backend (ou do LocalStorage caso esteja offline)
  const loadCaminhoes = async () => {
    try {
      const data = await api.caminhao.getAll();
      setCaminhoes(data);
    } catch (e) {
      onNotify('Erro ao carregar a lista de caminhões.', 'error');
    }
  };

  // Disparado assim que a página é carregada pela primeira vez
  useEffect(() => {
    loadCaminhoes();
  }, []);

  // --- AÇÕES DO FORMULÁRIO (CRIAR / EDITAR / EXCLUIR) ---

  // Prepara o formulário para cadastrar um novo caminhão
  const handleOpenCreate = () => {
    setEditingId(null); // Define como criação
    setForm({ placa: '', chassi: '', marca: '', modelo: '', ano: new Date().getFullYear() });
    setIsModalOpen(true);
  };

  // Prepara o formulário com os dados do caminhão selecionado para edição
  const handleOpenEdit = (caminhao) => {
    setEditingId(caminhao.id); // Define como edição de um ID específico
    setForm({ 
      placa: caminhao.placa, 
      chassi: caminhao.chassi, 
      marca: caminhao.marca, 
      modelo: caminhao.modelo, 
      ano: caminhao.ano 
    });
    setIsModalOpen(true);
  };

  // Salva os dados (cadastra um novo ou atualiza um existente)
  const handleSave = async (e) => {
    e.preventDefault();

    // Validação básica dos campos obrigatórios
    if (!form.placa || !form.chassi || !form.marca || !form.modelo || !form.ano) {
      onNotify('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    try {
      if (editingId) {
        // Atualiza um caminhão existente
        await api.caminhao.update(editingId, { ...form, id: editingId });
        onNotify('Caminhão atualizado com sucesso!', 'success');
      } else {
        // Cadastra um novo caminhão
        await api.caminhao.create(form);
        onNotify('Caminhão cadastrado com sucesso!', 'success');
      }
      setIsModalOpen(false); // Fecha o modal após salvar
      loadCaminhoes(); // Recarrega a tabela com os novos dados
    } catch (err) {
      onNotify('Erro ao salvar os dados do caminhão.', 'error');
    }
  };

  // Remove um caminhão da lista
  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja remover este caminhão?')) {
      try {
        await api.caminhao.delete(id);
        onNotify('Caminhão removido com sucesso.', 'success');
        loadCaminhoes(); // Recarrega a tabela após excluir
      } catch (err) {
        onNotify('Erro ao excluir o caminhão.', 'error');
      }
    }
  };

  // --- FILTRO DE BUSCA ---
  // Filtra dinamicamente a lista com base no texto digitado na barra de pesquisa
  const filteredCaminhoes = caminhoes.filter(c =>
    c.placa.toLowerCase().includes(search.toLowerCase()) ||
    c.modelo.toLowerCase().includes(search.toLowerCase()) ||
    c.marca.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Cabeçalho da página */}
      <div className="page-header">
        <div className="page-title">
          <h1>Caminhões</h1>
          <p>Cadastre e gerencie a frota de caminhões da transportadora.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenCreate}>
          <Plus size={18} /> Novo Caminhão
        </button>
      </div>

      {/* Cartões de Indicadores/Métricas */}
      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon orange">
            <Truck />
          </div>
          <div className="stat-info">
            <h3>Total na Frota</h3>
            <p>{caminhoes.length}</p>
          </div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-icon emerald">
            <Truck />
          </div>
          <div className="stat-info">
            <h3>Mais Recente</h3>
            <p>{caminhoes.length > 0 ? Math.max(...caminhoes.map(c => c.ano)) : '-'}</p>
          </div>
        </div>
      </div>

      {/* Barra de Busca Dinâmica */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por placa, modelo ou marca..."
            style={{ paddingLeft: '2.5rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabela de Exibição dos Dados */}
      <div className="table-container">
        {filteredCaminhoes.length > 0 ? (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo / Marca</th>
                <th>Chassi</th>
                <th>Ano</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCaminhoes.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: '700', color: 'var(--accent-orange)' }}>{c.placa}</td>
                  <td>
                    <div>{c.modelo}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.marca}</div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{c.chassi}</td>
                  <td>{c.ano}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button className="btn-icon btn-icon-edit" onClick={() => handleOpenEdit(c)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon btn-icon-delete" onClick={() => handleDelete(c.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <Truck />
            <p>Nenhum caminhão encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal Deslizante/Flutuante para Cadastro e Edição */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Editar Caminhão' : 'Cadastrar Caminhão'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Placa</label>
                  <input
                    type="text"
                    className="form-input"
                    maxLength={10}
                    placeholder="Ex: ABC-1234"
                    value={form.placa}
                    onChange={(e) => setForm({ ...form, placa: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ano de Fabricação</label>
                  <input
                    type="number"
                    className="form-input"
                    min={1950}
                    max={new Date().getFullYear() + 2}
                    value={form.ano}
                    onChange={(e) => setForm({ ...form, ano: parseInt(e.target.value) || new Date().getFullYear() })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Número do Chassi</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Insira o chassi de 17 caracteres"
                  value={form.chassi}
                  onChange={(e) => setForm({ ...form, chassi: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Marca</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Volvo, Scania"
                    value={form.marca}
                    onChange={(e) => setForm({ ...form, marca: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Modelo</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: FH 540, R 450"
                    value={form.modelo}
                    onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
