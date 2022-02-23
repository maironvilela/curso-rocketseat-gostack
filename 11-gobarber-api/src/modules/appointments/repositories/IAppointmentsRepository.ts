import Appointment from '@entities/Appointment';
import ICreateAppontmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { Provider } from 'tsyringe';
import IFindAllDayFromProviders from '../dtos/IFindAllDayFromProvidersDTO';
import IListFindAllMonthFromProvidersDTO from '../dtos/IFindAllMonthFromProvidersDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppontmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IListFindAllMonthFromProvidersDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: IFindAllDayFromProviders): Promise<Appointment[]>;

}
