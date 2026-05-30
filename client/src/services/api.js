// src/services/api.js
// Cliente de conexão com o backend C# do TruckerService

// Função auxiliar que monta o header com o token JWT salvo no login
function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const api = {
  caminhao: {
    // GET /api/caminhao
    getAll: async () => {
      const response = await fetch("/api/caminhao", {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Falha ao buscar caminhões no servidor.");
      return await response.json();
    },

    // GET /api/caminhao/{id}
    getById: async (id) => {
      const response = await fetch(`/api/caminhao/${id}`, {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Falha ao buscar o caminhão no servidor.");
      return await response.json();
    },

    // POST /api/caminhao
    create: async (data) => {
      const response = await fetch("/api/caminhao", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Falha ao cadastrar o caminhão no servidor.");
      return await response.json();
    },

    // PUT /api/caminhao/{id}
    update: async (id, data) => {
      const response = await fetch(`/api/caminhao/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Falha ao atualizar o caminhão no servidor.");
      return data;
    },

    // DELETE /api/caminhao/{id}
    delete: async (id) => {
      const response = await fetch(`/api/caminhao/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Falha ao remover o caminhão do servidor.");
    },
  },
};
