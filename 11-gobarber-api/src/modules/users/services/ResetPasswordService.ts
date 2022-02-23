import AppError from "@shared/errors/AppError";
import { addHours, isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import IUsersTokenRepository from "../repositories/IUsersTokenRepository";


interface iRequest {
  token: string,
  password: string,
}

@injectable()
class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUsersTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) { }

  public async execute({ token, password }: iRequest): Promise<void> {

    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token Invalido');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("Usuario inexistente")
    }

    //Object.assign(user, { password })
    user.password = await this.hashProvider.generateHash(password);

    this.userRepository.save(user)

  }

}

export default ResetPasswordService;
