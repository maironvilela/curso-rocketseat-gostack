import AppError from "@shared/errors/AppError";
import "reflect-metadata"
import FakeUsersRepositories from "../repositories/fake/FakeUsersRepository"
import IUsersRepository from "../repositories/IUsersRepository";
import ShowProfileService from "./ShowProfileService";

let fakeUsersRepositories: IUsersRepository;

let showProfileService: ShowProfileService



beforeEach(() => {
  fakeUsersRepositories = new FakeUsersRepositories();

  showProfileService = new ShowProfileService(
    fakeUsersRepositories
  );
})

describe("Show Users Profile", () => {

  it('should be able to return the user profile', async () => {

    const { id } = await fakeUsersRepositories.create({
      name: 'Maria Aparecida',
      email: 'maria.a@email.com',
      password: '123'
    })

    const userFind = await showProfileService.execute({ id })


    expect(userFind.id).toBe(id)

  })

  it('should note be able to return the user profile fom non-existing user', async () => {

    await expect(showProfileService.execute({ id: "nom-existing" })).rejects.toBeInstanceOf(AppError)

  })



})

