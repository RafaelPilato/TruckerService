import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";

const titles = {
  "/": {
    title: "Painel inicial",
    subtitle: "Estrutura base do front-end pronta para evoluir com seguranca.",
  },
  "/caminhoes": {
    title: "Caminhoes",
    subtitle: "Modulo preparado para cadastro, listagem e manutencao da frota.",
  },
  "/mecanicos": {
    title: "Mecanicos",
    subtitle: "Area reservada para o gerenciamento de profissionais da oficina.",
  },
  "/ordens-servico": {
    title: "Ordens de servico",
    subtitle: "Fluxo visual inicial para abertura, acompanhamento e fechamento.",
  },
  "/login": {
    title: "Login",
    subtitle: "Acesse sua conta para entrar na plataforma.",
  },
  "/cadastro": {
    title: "Cadastro de usuario",
    subtitle: "Crie uma conta para comecar a usar o sistema.",
  },
};

export default function AppShell() {
  const location = useLocation();
  const header = titles[location.pathname] ?? titles["/"];
  const isHome = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/cadastro";
  const currentUser = null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      {!isAuthPage && (
        <>
          <div
            className={isSidebarOpen ? "sidebar-overlay sidebar-overlay--visible" : "sidebar-overlay"}
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden={!isSidebarOpen}
          />
          <SideNav isOpen={isSidebarOpen} onNavigate={() => setIsSidebarOpen(false)} />
        </>
      )}

      <div className="app-main">
        <div className="topbar-shell">
          <div className="topbar-left">
            {!isAuthPage && (
              <button
                type="button"
                className="menu-toggle"
                onClick={() => setIsSidebarOpen((current) => !current)}
                aria-label={isSidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
                aria-expanded={isSidebarOpen}
              >
                <span />
                <span />
                <span />
              </button>
            )}

            <Link to="/" className="brand-chip brand-chip--link" aria-label="Ir para a pagina inicial">
              <span className="brand-icon">TS</span>
              <strong>TruckerService</strong>
            </Link>
          </div>

          <Link
            to={currentUser ? "/" : "/login"}
            className="auth-chip"
            aria-label={currentUser ? "Abrir perfil do usuario" : "Ir para login"}
          >
            <strong>{currentUser ?? "Login"}</strong>
          </Link>
        </div>

        {!isHome && !isAuthPage && (
          <header className="app-header">
            <div className="page-heading">
              <p className="eyebrow">TruckerService</p>
              <h1>{header.title}</h1>
              <p className="header-copy">{header.subtitle}</p>
            </div>
          </header>
        )}

        <main
          className={
            isAuthPage
              ? "page-surface page-surface--auth"
              : isHome
                ? "page-surface page-surface--home"
                : "page-surface"
          }
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
