import FakeUsersRepositories from "@modules/users/repositories/fake/FakeUsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import RedisCacheProvider from "@shared/container/providers/CacheProvider/Implementations/RedisCacheProvider";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import ListProviderServier from "./ListProviderService"

let listProviderService: ListProviderServier;
let usersRepository: IUsersRepository
let cacheProvider: ICacheProvider;

beforeEach(() => {
  usersRepository = new FakeUsersRepositories;
  cacheProvider = new RedisCacheProvider();
  listProviderService = new ListProviderServier(
    usersRepository,
    cacheProvider
  );


})

describe("List Providers", () => {


  it('should be able to list the providers except the user Logged', async () => {
    await usersRepository.create({
      name: 'Maria Aparecida',
      email: 'maria@email.com',
      password: '123'
    })
    await usersRepository.create({
      name: 'Jose Valencio',
      email: 'jv@email.com',
      password: '123'
    })

    const result = await listProviderService.execute({});

    expect(result.length).toEqual(2);

  })

  it('should be able to list the providers', async () => {
    const loggedUser = await usersRepository.create({
      name: 'Maria Aparecida',
      email: 'maria@email.com',
      password: '123'
    })
    await usersRepository.create({
      name: 'Jose Valencio',
      email: 'jv@email.com',
      password: '123'
    })

    const providers = await listProviderService.execute({ userId: loggedUser.id });

    expect(providers.length).toEqual(1);
    expect(providers[0].name).toBe('Jose Valencio');

  })

})
