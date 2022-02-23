import React, { useState, useCallback, useContext, createContext } from 'react';
import { uuid } from 'uuidv4';
import ToastsContainer from '../components/ToastsContainer';

interface ToastContextData {
  addToasts(message: Omit<ToastsMessage, 'id'>): void;
  removeToasts(id: string): void;
}

export interface ToastsMessage {
  id?: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastsContext = createContext<ToastContextData>({} as ToastContextData);

const ToastsProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastsMessage[]>([]);

  const addToasts = useCallback(
    ({ type, title, description }: Omit<ToastsMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      console.log(toast);

      setMessages(state => [...state, toast]);
    },

    [],
  );

  const removeToasts = useCallback((id: '') => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastsContext.Provider value={{ addToasts, removeToasts }}>
      {children}
      <ToastsContainer messages={messages} />
    </ToastsContext.Provider>
  );
};

function useToasts(): ToastContextData {
  const context = useContext(ToastsContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastsProvider');
  }

  return context;
}

export { useToasts, ToastsProvider };
