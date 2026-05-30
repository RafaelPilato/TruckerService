// src/services/api.js
// Cliente de conexão com o backend C# do TruckerService

import axios from "axios";

// Instância axios compartilhada — injeta o token JWT automaticamente
// Usa o proxy do Vite (/api → http://localhost:5017/api)
const axiosApi = axios.create({
  baseURL: "/api",
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Exportação default — usada pela OrdensServicoPage
// Ex: import api from "../services/api"  →  api.get("/ordemservico")
export default axiosApi;

// ✅ Exportação nomeada — usada pela CaminhoesPage
// Ex: import { api } from "../services/api"  →  api.caminhao.getAll()
export const api = {
  caminhao: {
    // GET /api/caminhao
    getAll: () => axiosApi.get("/caminhao").then((r) => r.data),

    // GET /api/caminhao/{id}
    getById: (id) => axiosApi.get(`/caminhao/${id}`).then((r) => r.data),

    // POST /api/caminhao
    create: (data) => axiosApi.post("/caminhao", data).then((r) => r.data),

    // PUT /api/caminhao/{id}
    update: (id, data) => axiosApi.put(`/caminhao/${id}`, data).then(() => data),

    // DELETE /api/caminhao/{id}
    delete: (id) => axiosApi.delete(`/caminhao/${id}`),
  },
};
