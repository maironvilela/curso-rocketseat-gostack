/* eslint-disable camelcase */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../services/api';

/* Interface com as informações retornadas da API que interessa o contexto. Informações
  ficarao armazenada no state do contexto
*/

interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}
interface AuthState {
  token: string;
  user: User;
}

// Informações que a função signIn recebe como parametro
interface SigInCredentials {
  email: string;
  password: string;
}

// Interface com o que será disponibilizados para os demais componentes
interface AuthContextState {
  user: User;
  token: string;
  signIn(credential: SigInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    // carrega as informações do token e do usuario do local storage
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // verificar se contem informações nas variaveis após recarregar a pagina
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      // retorna o token e o usuario inicializando o state,
      return { token, user: JSON.parse(user) };
    }
    // inicializa o state com um objeto vazio, forçando o tipo do mesmo como AuthState
    return {} as AuthState;
  });

  const updateUser = useCallback(
    (userData: User) => {
      setData({
        token: data.token,
        user: userData,
      });

      localStorage.setItem('@GoBarber:user', JSON.stringify(userData));
    },
    [data.token],
  );

  const signOut = useCallback(() => {
    const token = localStorage.removeItem('@GoBarber:token');
    const user = localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }: SigInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { user, token } = response.data;
    // armazena o retorno da api no estado do contexto
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    // Armazena o token e o user no State
    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Falha a criar Sessão');
  }
  return context;
}

export { AuthProvider, useAuth };
