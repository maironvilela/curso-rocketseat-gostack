import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding-left: 10px;

  width: 340px;
  height: 56px;
  border-radius: 10px;
  font-size: 16px;

  border: 2px solid #232129;
  color: #666360;

  ${props =>
    props.isErrored &&
    css`
      border-color #c53030;
     `}

  ${props =>
    props.isFocused &&
    css`
      border-color #ff9000;
      color #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color #ff9000;
    `}

  svg {
    margin-right: 10px;
  }

  input {
    flex: 1;
    height: 100%;
    background-color: transparent;
    border: 0;
    color: #fff;
    padding-right: 10px;

    &::placeholder {
      color: #666360;
      background-color: transparent;
    }
  }

  & + div {
    margin-top: 5px;
  }
`;

export const Error = styled(Tooltip)`
  span {
    background-color: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }

  span {
    background-color: #c53030;
  }
`;
