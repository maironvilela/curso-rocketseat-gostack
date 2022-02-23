import AppError from "@shared/errors/AppError";
import "reflect-metadata"

import BCryptHashProvider from "../providers/HashProvider/implementations/BCryptHashProvider";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import FakeUsersRepositories from "../repositories/fake/FakeUsersRepository"
import IUsersRepository from "../repositories/IUsersRepository";
import UpdateProfileService from "./UpdateProfileService";

let fakeUsersRepositories: IUsersRepository;
let hashProvider: IHashProvider;

let updateProfileService: UpdateProfileService



beforeEach(() => {
  fakeUsersRepositories = new FakeUsersRepositories();
  hashProvider = new BCryptHashProvider();

  updateProfileService = new UpdateProfileService(
    fakeUsersRepositories,
    hashProvider

  );
})



describe("Update Users Profile", () => {

  it('should be able to upate profile without password', async () => {

    //Criar usuario


    const user = await fakeUsersRepositories.create({
      name: 'Maria Aparecida',
      email: 'maria.a@email.com',
      password: await hashProvider.generateHash('123')
    })

    //Alterar usuario

    const updateUser = await updateProfileService.execute({
      id: user.id,
      name: 'Maria Aparecida da Silva',
      email: 'mariaaparecida@email.com',
    });

    //Verificar propriedades atualizadas

    expect(updateUser.name).toBe('Maria Aparecida da Silva')
    expect(updateUser.email).toBe('mariaaparecida@email.com')

  })

  it('should be able to upate profile', async () => {

    //Criar usuario


    const user = await fakeUsersRepositories.create({
      name: 'Maria Aparecida',
      email: 'maria.a@email.com',
      password: await hashProvider.generateHash('123')
    })

    //Alterar usuario

    const updateUser = await updateProfileService.execute({
      id: user.id,
      name: 'Maria Aparecida da Silva',
      email: 'mariaaparecida@email.com',
      password: '113',
      old_password: '123',
    });

    //Verificar propriedades atualizadas

    expect(updateUser.name).toBe('Maria Aparecida da Silva')
    expect(updateUser.email).toBe('mariaaparecida@email.com')
    expect(updateUser.password).toBe(updateUser.password)
  })


  it('should not be able to update the email using an already registered email ', async () => {

    //Criar usuario

    await fakeUsersRepositories.create({
      name: 'Pedro Algusto',
      email: 'pedroalgusto@email.com',
      password: '123'
    })

    //Criar um novo usuario
    const user = await fakeUsersRepositories.create({
      name: 'Maria Aparecida',
      email: 'maria.a@email.com',
      password: '123'
    })

    await expect(updateProfileService.execute({
      id: user.id,
      name: 'Maria Aparecida da Silva',
      email: 'pedroalgusto@email.com',
      password: '1234',
      old_password: '123',
    })).rejects.toBeInstanceOf(AppError)



  })

  it('should not be able to upate profile with incorrect password', async () => {

    //Criar usuario

    const user = await fakeUsersRepositories.create({
      name: 'Maria Aparecida',
      email: 'maria.a@email.com',
      password: await hashProvider.generateHash('123')
    })


    await expect(updateProfileService.execute({
      id: user.id,
      name: 'Maria Aparecida da Silva',
      email: 'mariaaparecida@email.com',
      password: '1234',
      old_password: '1234',
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to upate profile without old password', async () => {

    //Criar usuario

    const user = await fakeUsersRepositories.create({
      name: 'Maria Aparecida',
      email: 'maria.a@email.com',
      password: await hashProvider.generateHash('123')
    })


    await expect(updateProfileService.execute({
      id: user.id,
      name: 'Maria Aparecida da Silva',
      email: 'mariaaparecida@email.com',
      password: '1234',
    })).rejects.toBeInstanceOf(AppError);


  })

  it('should not be able to upate profile without invalid id', async () => {

    //Criar usuario

    await expect(updateProfileService.execute({
      id: '2369',
      name: 'Maria Aparecida da Silva',
      email: 'mariaaparecida@email.com',
      password: '1234',
    })).rejects.toBeInstanceOf(AppError);


  })


})

