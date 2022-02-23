import { Response, Request } from "express";
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const user = await authenticateUserService.execute({ email, password });
    return response.json(classToClass(user));
  }
}
