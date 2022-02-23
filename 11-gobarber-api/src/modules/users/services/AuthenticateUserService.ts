import { sign } from 'jsonwebtoken';
import { classToClass } from 'class-transformer';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import cache from '@config/cache';


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserServer {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ email, password }: Request): Promise<Response> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha Invalido', 401);
    }
    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email ou senha Invalidos', 401);
    }

    const { secret = '', expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });


    return { user, token };
  }
}
export default AuthenticateUserServer;
