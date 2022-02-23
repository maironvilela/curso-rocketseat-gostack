import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from "../dtos/ISendMailDTO";
import IEmailTemplateProvider from "../../MailTamplateProvider/models/IMailTemplateProvider";
import { inject, injectable } from "tsyringe";
import HandlebarsMailTemplateProvider from "../../MailTamplateProvider/implementations/HandlebarsMailTemplateProvider";

@injectable()
export default class EtherealMailProvider implements IMailProvider {

  private client: Transporter
  private mailTemplateProvider: IEmailTemplateProvider;

  constructor(
    // @inject('MailTemplateProvider')
    // private mailTemplateProvider: IEmailTemplateProvider,

  ) {
    this.mailTemplateProvider = new HandlebarsMailTemplateProvider();


    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      this.client = transporter;
    });
  }



  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {

    const info = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipegobarber@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

