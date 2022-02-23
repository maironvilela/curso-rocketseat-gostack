import handlebars from 'handlebars'
import IMailProvider from "../../MailProvider/models/IMailProvider";
import IEmailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import fs from 'fs'

class HandlebarsMailTemplateProvider implements IEmailTemplateProvider {


  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })


    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables);
  }

}

export default HandlebarsMailTemplateProvider
