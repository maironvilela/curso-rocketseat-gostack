import styled from 'styled-components';

export const Container = styled.div`
  /* Posiciona os componentes filha de acordo com a
  posição do container e nao da tela */
  position: relative;
  span {
    width: 140px;
    background: #ff9000;
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.8s;
    //visibility: hidden;

    position: absolute;
    bottom: calc(100% + 3px);
    left: 30%;
    transform: translateX(-50%);

    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 10px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    &:hover {
      opacity: 1;
      visibility: visible;
    }
  }
`;
