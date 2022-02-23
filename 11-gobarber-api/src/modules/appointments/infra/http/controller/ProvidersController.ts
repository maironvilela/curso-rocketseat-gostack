import ListProviderServier from "@modules/appointments/services/ListProviderService";
import { classToClass } from 'class-transformer';
import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";


@injectable()
export default class ProvidersController {



  public async index(request: Request, response: Response): Promise<Response> {

    const userId = request.user.id;

    const listProviderServier = container.resolve(ListProviderServier);

    const providers = await listProviderServier.execute(
      {
        userId
      }
    )

    console.log(classToClass(providers))

    return response.json(classToClass(providers))

  }
}
