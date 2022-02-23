import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { json } from "express";
import { inject, injectable } from "tsyringe";

import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";


@injectable()
class ListUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute(): Promise<User[]> {

    //verifica se a consulta consta no cache
    let dataCache;
    dataCache = await this.cacheProvider.recover<User[]>(`users-list:all`);

    if (dataCache) {
      console.log("Buscando no Cache")
      return dataCache;
    }

    console.log("Buscando no banco de dados")

    const users = await this.usersRepository.findAllProviders({});
    await this.cacheProvider.save(`users-list:all`, JSON.stringify(users))

    return users;
  }

}

export default ListUserService;
