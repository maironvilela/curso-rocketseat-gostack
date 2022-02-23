import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

const apiMOck = new MockAdapter(api);

describe('Auth Hook', () => {
  it('shold be able to singn in', async () => {
    const codeResponse = 200;
    const apiResponse = {
      user: {
        id: '12345-dass14ds',
        name: 'Maria da Silva',
        email: 'mariasilva@email.com',
      },
      token: 'dasewq-asdasd-erfqwe-qwes12',
    };

    apiMOck.onPost('sessions').reply(codeResponse, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'mariasilva@email.com',
      password: '12345',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      result.current.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(result.current.user),
    );

    expect(result.current.user.email).toEqual('mariasilva@email.com');
  });

  it('should restore saved data from storage when inits', () => {
    const setItemSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(key => {
        switch (key) {
          case '@GoBarber:token':
            return 'token-123';
          case '@GoBarber:user':
            return JSON.stringify({
              id: '12345-dass14ds',
              name: 'Maria da Silva',
              email: 'mariasilva@email.com',
            });
          default:
            return null;
        }
      });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('mariasilva@email.com');
  });

  it('shold be able to singn out', async () => {
    const setItemSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(key => {
        switch (key) {
          case '@GoBarber:token':
            return 'token-123';
          case '@GoBarber:user':
            return JSON.stringify({
              id: '12345-dass14ds',
              name: 'Maria da Silva',
              email: 'mariasilva@email.com',
            });
          default:
            return null;
        }
      });

    const removeItemSpy = jest
      .spyOn(Storage.prototype, 'removeItem')
      .mockImplementation(value => {
        console.log(value);
      });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:token');
    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:user');
    expect(result.current.user).toBeUndefined();
  });

  it('shold be able to update', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const user = {
      id: '12345-dass14ds',
      name: 'Maria da Silva',
      avatar_url: 'mariadasilva.jpg',
      email: 'mariasilva@gmail.com',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
