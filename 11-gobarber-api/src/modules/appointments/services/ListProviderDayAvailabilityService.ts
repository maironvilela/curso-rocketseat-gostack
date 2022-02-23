import { getHours, isAfter } from "date-fns";
import { container, inject, injectable, Provider } from "tsyringe";
import AppointmentRepository from "../infra/typeorm/repositories/AppointmentRepository";
import IAppointmentRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string,
  day: number,
  month: number,
  year: number
}

type IResponse = Array<{
  hour: number,
  available: boolean,
}>


@injectable()
class ListProviderDayAvalilabilityService {


  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) { }

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {

    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    })


    //recupera a data atual para exceção dos agendamentos anteriores
    const currentDate = new Date(Date.now());


    const numberOfAppointment = 10
    const startHours = 8

    const eachHoursArray = Array.from({
      length: numberOfAppointment
    }, (_, index) => index + startHours)


    const availableTimes = eachHoursArray.map(hour => {

      const appointment = appointments.find(
        appointment => getHours(appointment.date) + 3 === hour
      )
      const dateAppointment = new Date(year, month - 1, day, hour)
      return {
        hour,
        available: !appointment && isAfter(dateAppointment, currentDate)
      }
    })

    console.log(availableTimes)

    return availableTimes
  }
}

export default ListProviderDayAvalilabilityService
