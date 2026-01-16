// Créez un nouveau fichier src/contexts/ToastContext.tsx
import React, { createContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { Toast } from '../components/ui';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextProps {
  showToast: (message: string, type: ToastType) => void;
}

// Export du context pour que le hook puisse l'utiliser
export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  // Mémoriser la fonction showToast
  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  }, []);

  // Mémoriser la fonction hideToast
  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  // Mémoriser la valeur du contexte
  const value = useMemo(
    () => ({ showToast }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};