import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }


  public async execute({ name, email, password }: Request): Promise<User> {
    const CheckEmailExists = await this.userRepository.findByEmail(email);

    if (CheckEmailExists) {
      throw new AppError('E-mail ja cadastrado', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('users-list')



    return user;
  }
}

export default CreateUserService;
