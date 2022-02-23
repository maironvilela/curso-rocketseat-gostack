import styled from 'styled-components';
import { shade } from 'polished';

import SignInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      margin-top: 60px;
      font-size: 32px;
    }

    a {
      margin-top: 10px;

      text-decoration: none;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.3, '#fff')};
        //border-bottom: 1px solid ${shade(0.3, '#fff')};
      }
    }
  }

  > a {
    display: flex;
    align-content: center;

    margin-top: 40px;

    text-decoration: none;
    font-size: 16px;
    font-weight: 400;
    color: #ff9000;

    &:hover {
      color: ${shade(0.3, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignInBackground}) no-repeat center;
  //ocupa todo espaço desejado
  background-size: cover;
`;
