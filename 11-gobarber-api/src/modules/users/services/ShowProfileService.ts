import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";


interface IRequest {
  id: string,
}

@injectable()
class ShowProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<User> {


    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuario nao encontrado.')
    }
    return user;
  }
}
export default ShowProfileService
