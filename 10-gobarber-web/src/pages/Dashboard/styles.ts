import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  background: #28262e;
  padding: 20px 0;
`;

export const HeaderContent = styled.div`
  padding: 0 100px;
  display: flex;
  margin: 0 auto;

  > img {
    width: 130px;
  }

  button {
    background: transparent;
    border: 0;

    margin-left: auto;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  margin-left: 80px;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    line-height: 20px;

    span {
      color: #999591;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Main = styled.main`
  display: flex;
  max-width: 1120px;
  margin: 32px auto;
`;

export const Schedule = styled.section`
  display: 1;
  padding-left: 32px;
  width: 600px;

  section {
    margin-top: 40px;

    > span {
      position: relative;
      color: #999591;
      font-size: 16px;
      top: 10px;
    }
    strong.section {
      padding-bottom: 10px;
      color: #999591;
      border-bottom: 1px solid #3e3b47;
      display: block;
    }
  }

  p {
    display: flex;
    margin-top: 8px;
    margin-bottom: 30px;
    span {
      display: flex;
      align-items: center;
      color: #ff9000;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 5px;
    }
  }
`;

export const NextAppointment = styled.div`
  div {
    position: relative;
    display: flex;
    width: 540px;
    height: 80px;
    align-items: center;
    background: #3e3b47;
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 0 20px;
    border-radius: 10px;

    &::before {
      position: absolute;
      content: '';
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background-color: #ff9000;
    }

    img {
      width: 50px;
      height: 50px;

      border-radius: 50%;
    }

    strong {
      margin-left: 10px;
    }

    span {
      margin-left: auto;

      svg {
        margin-right: 5px;
        color: #ff9000;
      }
    }
  }
`;
export const Appointment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;

  span {
    svg {
      margin-right: 5px;
      color: #ff9000;
    }
  }

  div {
    > span {
      color: #999591;
    }
    border-radius: 10px;

    display: flex;
    align-items: center;
    background: #3e3b47;
    margin-left: 16px;
    width: 469px;
    padding: 20px 20px;
    img {
      width: 36px;
      border-radius: 50%;
    }
  }
  strong {
    margin-left: 10px;
  }
`;

export const Calendar = styled.section`
  width: 320px;
  margin-left: 20px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
