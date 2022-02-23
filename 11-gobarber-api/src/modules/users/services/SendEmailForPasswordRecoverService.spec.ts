import "reflect-metadata"

import FakeMailProvider from '@shared/container/providers/MailProvider/fake/FakeMailProvider'
import SendEmailForPasswordRecoverService from '../services/SendEmailForPasswordRecoverService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import AppError from "@shared/errors/AppError";
import FakeUsersTokenRepository from '../repositories/fake/FakeUsersTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendEmailForPasswordRecoverService: SendEmailForPasswordRecoverService;



describe("Send Mail for password recover", () => {
  //Cria uma instancia dos objetos antes de cada teste
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeMailProvider = new FakeMailProvider();

    sendEmailForPasswordRecoverService = new SendEmailForPasswordRecoverService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository
    );
  })

  it('should be able send e-mail for password recover', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');


    const user = await fakeUsersRepository.create({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      password: '123456'
    })


    await sendEmailForPasswordRecoverService.execute({ email: "maria@email.com" });

    expect(sendMail).toHaveBeenCalled();

  })

  it('Should not be able unauthenticated user recover password', async () => {
    await expect(sendEmailForPasswordRecoverService.execute(
      {
        email: 'maria@email.com'
      }
    )).rejects.toBeInstanceOf(AppError)
  })

  it('should generate token for password reset', async () => {

    const generate = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      password: '123456'
    })

    await sendEmailForPasswordRecoverService.execute({ email: 'maria@email.com' })

    expect(generate).toHaveBeenCalledWith(user.id)

  })

})
