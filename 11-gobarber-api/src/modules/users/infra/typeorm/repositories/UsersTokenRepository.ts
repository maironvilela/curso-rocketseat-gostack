import CreateUserDTO from "@modules/users/dtos/CreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IUsersTokenRepository from "@modules/users/repositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import UsersToken from "../entities/UsersToken";


class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UsersToken>

  constructor() {

    this.ormRepository = getRepository(UsersToken)
  }
  public async generate(id: string): Promise<UsersToken> {
    const userToken = this.ormRepository.create({
      user_id: id
    });

    const userTokenSave = await this.ormRepository.save(userToken);

    return userTokenSave;

  }
  public async findByToken(token: string): Promise<UsersToken | undefined> {
    console.log('findByToken')
    const userToken = await this.ormRepository.findOne({
      where: { token }
    });

    return userToken;
  }

}

export default UsersTokenRepository;
