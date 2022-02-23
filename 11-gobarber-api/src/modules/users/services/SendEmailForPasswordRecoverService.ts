import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import UsersToken from '../infra/typeorm/entities/UsersToken';

interface Request {
  email: string;
}
@injectable()
class SendEmailForPasswordRecoverService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
  ) { }


  public async execute({ email }: Request): Promise<UsersToken> {

    const userFind = await this.userRepository.findByEmail(email);

    if (!userFind) {
      throw new AppError('Usuario inexistente')
    }

    //recebe um tokem que será enviado por email para reset da senha
    const userToken = await this.usersTokenRepository.generate(userFind.id);


    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')


    await this.mailProvider.sendMail({
      to: {
        name: userFind.name,
        email: userFind.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userFind.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${userToken.token}`
        },
      }
    }

    )
    return userToken;

  }
}

export default SendEmailForPasswordRecoverService;
