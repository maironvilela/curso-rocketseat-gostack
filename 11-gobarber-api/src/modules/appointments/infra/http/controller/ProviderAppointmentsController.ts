import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ProviderAppointmentsController {

  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;


    const listProviderAppointmentService = container.resolve(ListProviderAppointmentsService)

    const appointments = await listProviderAppointmentService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    })
    return response.json(appointments);
  }

}
export default ProviderAppointmentsController;
