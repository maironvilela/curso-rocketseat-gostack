import { container } from 'tsyringe';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

import IEmailTemplateProvider from "./models/IMailTemplateProvider";


container.registerSingleton<IEmailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
)
