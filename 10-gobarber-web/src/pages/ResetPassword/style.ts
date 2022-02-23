import styled from 'styled-components';

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
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignInBackground}) no-repeat center;
  //ocupa todo espaço desejado
  background-size: cover;
`;
