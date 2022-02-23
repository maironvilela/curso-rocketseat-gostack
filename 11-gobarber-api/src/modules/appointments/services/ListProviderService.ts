import cache from "@config/cache";
import User from "@modules/users/infra/typeorm/entities/User";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { classToClass } from "class-transformer";
import { inject, injectable } from "tsyringe";
import IListProviderDTO from "../dtos/IListProviderDTO";

interface IRequest {
  userId?: string
}


@injectable()
class ListProviderServier {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ userId }: IRequest): Promise<User[]> {

    let users;

    users = await this.cacheProvider.recover<User[]>(`provider-list:${userId}`)

    if (!users) {
      console.log("Busca Banco de dados")
      users = await this.usersRepository.findAllProviders({
        exceptUserId: userId
      })
    }

    await this.cacheProvider.save(
      `provider-list:${userId}`,
      JSON.stringify(classToClass(users)))



    return users;

  }

}

export default ListProviderServier
