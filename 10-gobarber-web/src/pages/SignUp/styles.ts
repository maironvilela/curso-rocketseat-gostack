import styled from 'styled-components';
import { shade } from 'polished';

import BakgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;

    margin-left: 8px;
    margin-top: 50px;
    text-decoration: none;
    color: #fff;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;
  max-width: 470px;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${BakgroundImg}) no-repeat center;
  background-size: cover;
  height: 100vh;
`;
