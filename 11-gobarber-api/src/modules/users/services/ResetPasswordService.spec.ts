import "reflect-metadata"
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import ResetPasswordService from "./ResetPasswordService"
import SendEmailForPasswordRecoverService from '@modules/users/services/SendEmailForPasswordRecoverService';
import FakeMailProvider from "@shared/container/providers/MailProvider/fake/FakeMailProvider";
import FakeUsersTokenRepository from "../repositories/fake/FakeUsersTokenRepository";
import FakeUsersRepositories from "../repositories/fake/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";


let fakeUserRepository: FakeUsersRepositories;
let fakeUserTokenRepository: FakeUsersTokenRepository;

let mailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;

let resetPasswordService: ResetPasswordService;
let sendEmailForPasswordRecoverService: SendEmailForPasswordRecoverService;


describe("Send Mail for password recover", () => {

  //Cria uma instancia dos objetos antes de cada teste
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepositories();
    fakeUserTokenRepository = new FakeUsersTokenRepository();

    mailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();

    sendEmailForPasswordRecoverService = new SendEmailForPasswordRecoverService(
      fakeUserRepository,
      mailProvider,
      fakeUserTokenRepository
    );
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider
    );
  })

  it('should be able password recover', async () => {

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    //Salvar usuario
    const user = await fakeUserRepository.create({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      password: '123456'
    })


    //Criar token para o usuario
    const { token } = await fakeUserTokenRepository.generate(user.id)

    //variaveis com valores que serão passados como parametro
    const password = '111';

    //Reseta a senha
    await resetPasswordService.execute({
      token, password
    });

    //recupera o usuario pelo id para verificar se a senha foi alterada
    const userUpdate = await fakeUserRepository.findById(user.id)

    //verifica se a senha foi alterada
    expect(userUpdate?.password).toBe(password);
    expect(generateHash).toBeCalledWith('111');

  })

  it('should not be able password recover with invalid token', async () => {


    //Salvar usuario
    const user = await fakeUserRepository.create({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      password: '123456'
    })


    //variaveis com valores que serão passados como parametro
    const password = '111';



    //verifica se a senha foi alterada
    expect(resetPasswordService.execute({
      token: '123665', password
    })).rejects.toBeInstanceOf(AppError);

  })


  it('should not be able password recover with invalid user', async () => {

    const { token } = await fakeUserTokenRepository.generate('000')

    await expect(
      resetPasswordService.execute({
        token, password: '123'
      })
    ).rejects.toBeInstanceOf(AppError);

  })

  it('Should not be able password recover with expired token', async () => {

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    //Salvar usuario
    const user = await fakeUserRepository.create({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      password: '123456'
    })


    //Criar token para o usuario
    const { token } = await fakeUserTokenRepository.generate(user.id)

    //sobrescreve a função "now" do objeto Date
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const date = new Date();
      return date.setHours(date.getHours() + 3);
    });

    //variaveis com valores que serão passados como parametro
    const password = '111';
    const confirmPassword = '111';

    //Reseta a senha
    await expect(resetPasswordService.execute({
      token, password
    })).rejects.toBeInstanceOf(AppError)
  })
})
