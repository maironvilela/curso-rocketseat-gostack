/* eslint-disable camelcase */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  format,
  isAfter,
  isBefore,
  isToday,
  parseISO,
  startOfHour,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Main,
  Schedule,
  Calendar,
  NextAppointment,
  Appointment,
} from './styles';
import api from '../../services/api';

// Interface com os dados da API que retorna o dia do mes e se esta disponível
interface MonthAvailabilityData {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hour: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user, token } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // estado que armazena a data selecionada
  const [selectedDate, setSelectedDate] = useState(new Date());

  // estado que armazena o mes corrente ao navegar pelo calendário
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // estado que armazena os dias do mes retornado da API
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityData[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // função que será executada quando alterado o mes no calendario
  useEffect(() => {
    api
      .get(`/provider/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
        // console.log(`/provider/${user.id}/month-availability`);
        // console.log(response.data);
      });
  }, [currentMonth, user.id, token]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then(response => {
        const appointmentFormated = response.data.map(appointment => {
          const dateUTC = new Date(appointment.date);
          dateUTC.setHours(dateUTC.getHours() + dateUTC.getUTCDate());
          return {
            ...appointment,
            hour: format(dateUTC, 'HH:mm'),
          };
        });
        setAppointments(appointmentFormated);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    /* Realiza um filter nos dias retornado da API e depois um map criando as datas
  dos dias nao disponíveis */
    const dates = monthAvailability
      .filter(day => day.available === false)
      .map(day => {
        const yaer = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(yaer, month, day.day);
      });

    return dates;
  }, [monthAvailability, currentMonth]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia ' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectWeekDay = useMemo(() => {
    const weekDay = format(selectedDate, 'cccc', { locale: ptBR });
    return weekDay;
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      console.log(appointment);
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const affternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      console.log(appointment);
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem Vindo</span>
              <Link to="profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Main>
        <Schedule>
          <h1>Horarios Agendados</h1>

          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectWeekDay}</span>
          </p>
          <section id="next-appointment">
            {isToday(selectedDate) && nextAppointment && (
              <>
                <span>Atendimento a seguir</span>
                {!nextAppointment && (
                  <Appointment>
                    <div>
                      <span>Nenhum Atendimento a seguir</span>
                    </div>
                  </Appointment>
                )}

                <NextAppointment>
                  <div>
                    <img
                      src={nextAppointment.user.avatar_url}
                      alt={nextAppointment.user.name}
                    />
                    <strong>{nextAppointment.user.name}</strong>
                    <span>
                      <FiClock />
                    </span>
                    {nextAppointment.hour}
                  </div>
                </NextAppointment>
              </>
            )}
          </section>

          <section id="morning-appointment">
            <strong className="section">Manha</strong>
            {!morningAppointments.length && (
              <Appointment>
                <div>
                  <span>Nenhum Atendimento nesse período</span>
                </div>
              </Appointment>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                </span>
                {appointment.hour}
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </section>

          <section id="afternoon-appointment">
            <strong className="section">Tarde</strong>
            {!affternoonAppointments.length && (
              <Appointment>
                <div>
                  <span>Nenhum Atendimento nesse período</span>
                </div>
              </Appointment>
            )}

            {affternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                </span>
                {appointment.hour}
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </section>
        </Schedule>

        <Calendar>
          <DayPicker
            selectedDays={selectedDate}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Main>
    </Container>
  );
};
export default Dashboard;
