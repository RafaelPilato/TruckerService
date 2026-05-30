import React, { useState } from 'react';
import CaminhoesPage from './pages/CaminhoesPage';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  // --- ESTADOS GLOBAIS ---
  const [notification, setNotification] = useState(null); // Controla as notificações flutuantes na tela

  // Função utilitária para exibir alertas flutuantes (notificações) na tela
  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null); // Remove a notificação após 4 segundos
    }, 4000);
  };

  return (
    <div className="app-container">
      {/* Conteúdo Principal do Painel - Apenas a página de Caminhões */}
      <main className="main-content">
        <CaminhoesPage onNotify={triggerNotification} />
      </main>

      {/* Alerta de Notificação Flutuante Global */}
      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
}
