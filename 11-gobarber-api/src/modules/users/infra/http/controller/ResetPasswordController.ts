import { Response, Request } from "express";
import ResetPasswordService from "@modules/users/services/ResetPasswordService";
import { container } from "tsyringe";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../../typeorm/repositories/UsersTokenRepository";
import BCryptHashProvider from "@modules/users/providers/HashProvider/implementations/BCryptHashProvider";

export default class ResetPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {
    /*
        const resetPasswordService = container.resolve(
          ResetPasswordService
        );*/


    const userRepository = new UsersRepository();
    const userTokenRepository = new UsersTokenRepository();
    const hashProvider = new BCryptHashProvider();
    const resetPasswordService = new ResetPasswordService(
      userRepository,
      userTokenRepository,
      hashProvider
    )

    const { token, password } = request.body;

    await resetPasswordService.execute({ token, password })

    return response.status(204).json();
  }
}
