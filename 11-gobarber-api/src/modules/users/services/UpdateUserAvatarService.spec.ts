import "reflect-metadata"
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import AppError from "@shared/errors/AppError";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";


let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  fakeStorageProvider = new FakeStorageProvider();
  updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
})

describe("Update Users Avatar", () => {

  it('should be able to upate avatar', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      password: '123'
    })

    const userUpdated = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'padrao.jpg'
    })

    expect(userUpdated.avatar).toBe('padrao.jpg')

  })

  it('should not be able to update the avatar without is authenticated', async () => {

    expect(updateUserAvatarService.execute({
      user_id: '123',
      avatarFileName: 'padrao.jpg'
    })).rejects.toBeInstanceOf(AppError)

  })

  it('should be able to delete old avatar', async () => {

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      password: '123',

    })

    const userUpdated = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'padrao.jpg'
    })

    const userDeleteAvatar = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'padrao2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('padrao.jpg')
    expect(userUpdated.avatar).toBe('padrao2.jpg')

  })

})
