import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface ErrorNotification {
  id: string;
  message: string;
}

interface ErrorContextType {
  errors: ErrorNotification[];
  addError: (message: string) => void;
  removeError: (id: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<ErrorNotification[]>([]);

  const addError = (message: string) => {
    const id = Date.now().toString();
    const newError: ErrorNotification = {
      id,
      message,
    };

    setErrors(prev => [...prev, newError]);

    setTimeout(() => {
      removeError(id);
    }, 5000);
  };

  const removeError = (id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError }}>
      {children}
    </ErrorContext.Provider>
  );
};