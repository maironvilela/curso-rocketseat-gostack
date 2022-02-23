import aws from 'aws-sdk';
import { inject, injectable } from "tsyringe";

import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from "../dtos/ISendMailDTO";
import IEmailTemplateProvider from "../../MailTamplateProvider/models/IMailTemplateProvider";

import mailConfig from '@config/mail'

@injectable()
export default class SESMailProvider implements IMailProvider {

  private client: Transporter



  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IEmailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_DEFAULT_REGION,
      }),
    });
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {

    const { email, name } = mailConfig.defaults.from;

    console.log(email)
    console.log(name)

    console.log(to.email)
    console.log(to.name)


    const info = await this.client.sendMail({
      from: {
        name: name,
        address: email,
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

  }
}

