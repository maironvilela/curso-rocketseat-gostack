import { uuid } from "uuidv4";
import { getYear, getMonth } from 'date-fns';

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllMonthFromProvidersDTO from "@modules/appointments/dtos/IFindAllMonthFromProvidersDTO";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentRepository from "../IAppointmentsRepository";
import IFindAllDayFromProvidersDTO from "@modules/appointments/dtos/IFindAllDayFromProvidersDTO";

class FakeAppointmentRepository implements IAppointmentRepository {

  private appointments: Appointment[] = []

  public async findAllInDayFromProvider(data: IFindAllDayFromProvidersDTO): Promise<Appointment[]> {
    return this.appointments;
  }


  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllMonthFromProvidersDTO): Promise<Appointment[]> {

    const appointmentsFilter = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year)


    return appointmentsFilter;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
      user_id
    })

    this.appointments.push(appointment);


    return appointment;
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      date.getTime() === appointment.date.getTime() && appointment.provider_id === provider_id
    )

    return findAppointment;

  }

}

export default FakeAppointmentRepository;
