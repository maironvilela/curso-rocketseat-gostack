import IParseMailTemplateDTO, { } from '../dtos/IParseMailTemplateDTO';

export default interface IEmailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>

}
