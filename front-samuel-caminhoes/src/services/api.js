// Cliente de Conexão com o Backend C# do TruckerService - Comunicação 100% Direta

export const api = {
  caminhao: {
    // Busca todos os caminhões diretamente da API C#
    getAll: async () => {
      const response = await fetch('/api/caminhao');
      if (!response.ok) {
        throw new Error('Falha ao buscar caminhões no servidor.');
      }
      return await response.json();
    },

    // Busca as informações de um único caminhão pelo ID
    getById: async (id) => {
      const response = await fetch(`/api/caminhao/${id}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar o caminhão no servidor.');
      }
      return await response.json();
    },

    // Cadastra um novo caminhão na API C#
    create: async (data) => {
      const response = await fetch('/api/caminhao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Falha ao cadastrar o caminhão no servidor.');
      }
      return await response.json();
    },

    // Atualiza um caminhão existente
    update: async (id, data) => {
      const response = await fetch(`/api/caminhao/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Falha ao atualizar o caminhão no servidor.');
      }
      return data;
    },

    // Exclui um caminhão do banco pelo ID
    delete: async (id) => {
      const response = await fetch(`/api/caminhao/${id}`, { 
        method: 'DELETE' 
      });
      if (!response.ok) {
        throw new Error('Falha ao remover o caminhão do servidor.');
      }
    }
  }
};
