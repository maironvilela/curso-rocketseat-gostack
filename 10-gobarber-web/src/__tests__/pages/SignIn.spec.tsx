import React, { Children } from 'react';
import { fireEvent, render, wait, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mocketSignIn = jest.fn();
const mockedAddToasts = jest.fn();

jest.mock('../../hooks/toasts', () => {
  return {
    useToasts: () => ({
      addToasts: mockedAddToasts,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mocketSignIn,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sing in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'maria@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sing in with invalid credential', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'email_invalid' } });
    fireEvent.change(passwordField, { target: { value: '123' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to sing in with invalid credential', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    mocketSignIn.mockImplementation(() => {
      throw new Error();
    });

    fireEvent.change(emailField, { target: { value: 'maria@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToasts).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
