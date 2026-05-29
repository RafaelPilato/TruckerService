import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // Se não tiver token, manda para o login
  // "replace" evita que o usuário volte para a página protegida com o botão "voltar"
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se tiver token, renderiza a página normalmente
  return <Outlet />;
}
