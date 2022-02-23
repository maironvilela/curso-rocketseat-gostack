import "reflect-metadata"
import CreateUserService from '../services/CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import RedisCacheProvider from "@shared/container/providers/CacheProvider/Implementations/RedisCacheProvider";
import cache from "@config/cache";

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUsersService: CreateUserService;
let cacheProvider: ICacheProvider;


beforeEach(() => {
  fakeHashProvider = new FakeHashProvider();
  fakeUsersRepository = new FakeUsersRepository();
  cacheProvider = new RedisCacheProvider();
  createUsersService = new CreateUserService(
    fakeUsersRepository,
    fakeHashProvider,
    cacheProvider
  );

})

describe("Create User Users", () => {
  it('should be able to create user', async () => {

    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })
    expect(user).toHaveProperty('id')

  })

  it('should not be able to create user whit existent e-mail', async () => {

    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })
    await expect(createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  })
})
