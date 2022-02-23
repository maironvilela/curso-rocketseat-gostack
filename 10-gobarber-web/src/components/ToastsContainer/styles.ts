import styled, { css } from 'styled-components';

interface ToastsProps {
  type?: 'info' | 'success' | 'error';
  hasNotDescription?: boolean;
}

const toastTypeVariations = {
  info: css`
    color: #3272b7;
    background-color: #f0f8ff;
  `,
  success: css`
    background-color: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background-color: #fddeee;
    color: #c53030;
  `,
};

export const Container = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 320px;
  overflow: hidden;
`;

export const Toasts = styled.div<ToastsProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;

  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  ${props => toastTypeVariations[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }

  > svg {
    position: relative;
    top: -20px;
  }

  div {
    flex: 1;
    margin-right: 20px;

    span {
      margin-left: 5px;
    }

    p {
      margin-left: 5px;
      margin-top: 8px;
      margin-right: 5px;
      font-size: 14px;
    }
  }

  button {
    position: absolute;
    height: 80px;
    right: 10px;
    width: 30px;
    background: transparent;
    border: 0;
    border-radius: 10px;
    color: inherit;

    svg {
      color: transparent;
      transition: color 0.8s;
    }

    &:hover {
      svg {
        // herda a cor definida no container
        color: inherit;
      }
    }
  }

  //ajustes caso o toast nao tenha descrição
  ${props =>
    props.hasNotDescription &&
    css`
      > svg {
        top: 0px;
      }
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;
