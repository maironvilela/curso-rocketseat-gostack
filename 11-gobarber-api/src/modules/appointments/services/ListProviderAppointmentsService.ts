import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { classToClass } from "class-transformer";
import { format } from "date-fns";
import { inject, injectable } from "tsyringe";
import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentRepository from "../infra/typeorm/repositories/AppointmentRepository";
import IAppointmentRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string,
  day: number,
  month: number,
  year: number
}
@injectable()
class ListProviderAppointmentsService {

  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ provider_id, day, month, year }: IRequest): Promise<Appointment[]> {

    const prefixKey = `list-appointments:${provider_id}`



    let appointments = await this.cacheProvider.recover<Appointment[]>(
      `${prefixKey}:${day}-${month}-${year}`
    )
    // let appointments;


    if (!appointments) {
      console.log("Carregando banco de dados")
      appointments = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
      })

      await this.cacheProvider.save(`${prefixKey}:${day}-${month}-${year}`, JSON.stringify(classToClass(appointments)))
    }

    return appointments;

  }

}

export default ListProviderAppointmentsService;
