import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Somente usuarios autenticados podem alterar o avatar',
        401,
      );
    }
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    const fileName = await this.storageProvider.saveFile(avatarFileName)

    user.avatar = fileName

    const userUpdate = this.userRepository.save(user);

    return userUpdate;
  }
}

export default UpdateUserAvatarService;
