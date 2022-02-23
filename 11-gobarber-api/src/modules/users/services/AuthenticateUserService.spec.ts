import "reflect-metadata"
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";
import RedisCacheProvider from "@shared/container/providers/CacheProvider/Implementations/RedisCacheProvider";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUsersService: CreateUserService;
let authenticateUserService: AuthenticateUserService;
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

  authenticateUserService = new AuthenticateUserService(
    fakeUsersRepository,
    fakeHashProvider,
    cacheProvider
  );
})

describe("Authenticate Users", () => {
  it('should be able to authenticate', async () => {

    const user = await fakeUsersRepository.create({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })

    const response = await authenticateUserService.execute({
      email: "maria@email.com",
      password: '123456'
    })

    console.log

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)

  })

  it('should not be able to authenticate with an invalid e-mail ', async () => {


    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })


    expect(authenticateUserService.execute({
      email: "maria@email.com.br",
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)


  })

  it('should not be able to authenticate with an invalid password ', async () => {



    const user = await fakeUsersRepository.create({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })


    await expect(authenticateUserService.execute({
      email: "maria@email.com",
      password: 'aadasda'
    })).rejects.toBeInstanceOf(AppError)


  })
})
