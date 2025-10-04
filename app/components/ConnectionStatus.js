// components/ConnectionStatus.jsx - NOVO COMPONENTE
import { useEffect, useState } from 'react';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      // Esconder status após 3 segundos
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    // Verificar status inicial
    setIsOnline(navigator.onLine);

    // Adicionar listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

//   if (!showStatus && isOnline) {
//     return null; // Não mostrar quando online e status não foi alterado
//   }

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-all duration-300 ${
      isOnline 
        ? 'bg-green-100 text-green-800' 
        : 'bg-orange-100 text-orange-800'
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        isOnline ? 'bg-green-500' : 'bg-orange-500'
      }`}></div>
      <span>
        {isOnline ? 'Online' : 'Offline'}
      </span>
      {isOnline &&  showStatus &&(
        <span className="text-xs">✓ Sincronizado</span>
      )}
    </div>
  );
};

export default ConnectionStatus;