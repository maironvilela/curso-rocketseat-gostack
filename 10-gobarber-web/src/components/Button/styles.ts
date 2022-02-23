import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 20px;
  background-color: #ff9000;
  border: 0;
  border-radius: 10px;
  transition: background-color, color 1.5s;

  font-size: 16px;
  font-weight: 500;
  width: 340px;
  height: 56px;
  left: 160px;
  top: 536px;
  &:hover {
    background: ${shade(0.2, '#ff9000')};
    color: #fff;
  }
`;
