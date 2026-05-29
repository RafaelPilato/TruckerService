import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
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
        <Route index element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />
        <Route path="caminhoes" element={<CaminhoesPage />} />
        <Route path="mecanicos" element={<MecanicosPage />} />
        <Route path="ordens-servico" element={<OrdensServicoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
