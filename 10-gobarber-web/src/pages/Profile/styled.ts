import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0;
  margin-bottom: 0px;
  height: 100vh;
`;
export const Header = styled.header`
  position: relative;
  width: 100%;
  padding-bottom: 115px;
  background: #28262e;

  display: flex;
  align-content: center;

  svg {
    position: absolute;
    top: 40%;
    margin-left: 10%;
    width: 32px;
    height: 32px;
    color: #999591;
  }
`;

export const Avatar = styled.div`
  position: relative;
  top: -80px;
  display: flex;
  flex-direction: column;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    display: flex;
    align-items: center;
    position: relative;
    top: -40px;
    width: 36px;
    height: 36px;
    margin-left: auto;
    margin-right: 20px;
    background: #ff9000;
    border-radius: 50%;
    transition: 1s;
    cursor: pointer;

    &:hover {
      background-color: ${shade(0.3, '#ff9000')};
    }

    svg {
      margin: 0 auto;
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    input {
      display: none;
    }
  }
`;
export const Content = styled.div`
  position: relative;
  top: -104px;

  h1 {
    font-size: 28px;
  }
`;
