import UsersToken from "../infra/typeorm/entities/UsersToken";

export default interface IUsersTokenRepository {

  generate(id: string): Promise<UsersToken>;
  findByToken(token: string): Promise<UsersToken | undefined>


}
