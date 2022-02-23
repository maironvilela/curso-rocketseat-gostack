import UsersToken from "@modules/users/infra/typeorm/entities/UsersToken";
import { uuid } from "uuidv4";
import IUsersTokenRepository from "../IUsersTokenRepository";




class FakeUsersTokenRepository implements IUsersTokenRepository {


  private usersToken: UsersToken[] = []

  public async findByToken(token: string): Promise<UsersToken | undefined> {
    const userTokenFind = this.usersToken.find(userToken => userToken.token === token);

    return userTokenFind;
  }

  public async generate(user_id: string): Promise<UsersToken> {
    const userToken = new UsersToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.usersToken.push(userToken);

    return userToken;
  }



}

export default FakeUsersTokenRepository;
