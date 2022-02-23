import ListProviderDayAvalilabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProviderDayAvailabiltyController {


  public async index(request: Request, response: Response): Promise<Response> {

    const providerDayAvailabiltyService = container.resolve(ListProviderDayAvalilabilityService)

    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const providers = await providerDayAvailabiltyService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(providers)

  }
}
