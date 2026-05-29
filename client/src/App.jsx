import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import CaminhoesPage from "./pages/CaminhoesPage";
import CadastroPage from "./pages/CadastroPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MecanicosPage from "./pages/MecanicosPage";
import OrdensServicoPage from "./pages/OrdensServicoPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>

        {/* Rotas públicas — qualquer um pode acessar */}
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />

        {/* Rotas protegidas — só acessa quem tiver token */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="caminhoes" element={<CaminhoesPage />} />
          <Route path="mecanicos" element={<MecanicosPage />} />
          <Route path="ordens-servico" element={<OrdensServicoPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}