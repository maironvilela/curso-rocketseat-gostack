// repositorio especifico do typeorm
import { getRepository, Repository, Raw } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProvidersDTO from '@modules/appointments/dtos/IFindAllMonthFromProvidersDTO';
import IFindAllDayFromProvidersDTO from '@modules/appointments/dtos/IFindAllDayFromProvidersDTO';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  // construtor que criara uma instancia de getRepository
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }


  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllDayFromProvidersDTO): Promise<Appointment[]> {

    const parseMonth = String(month).padStart(2, '0')
    const parseDay = String(day).padStart(2, '0')


    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => `to_char(
          ${dateFieldName}, 'DD-MM-yyyy') = '${parseDay}-${parseMonth}-${year}'`,
        )
      }, relations: ['user']
    });

    return appointments;
  }

  public async findAllInMonthFromProvider({
    provider_id, month, year
  }: IFindAllMonthFromProvidersDTO): Promise<Appointment[]> {
    // 1 => 01
    const parseMonth = String(month).padStart(2, '0')

    const appointment = await this.ormRepository.find({
      where: {
        provider_id: provider_id,
        date: Raw(dateFieldName => `to_char(
          ${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`,
        )
      }
    })


    return appointment;
  }

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ date, provider_id, user_id });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });
    return findAppointment;
  }

  public async find(): Promise<Appointment[] | undefined> {
    const findAppointment = await this.ormRepository.find();
    findAppointment.forEach(fa => {
      console.log(fa)
    })
    return findAppointment;
  }
}

export default AppointmentRepository;
