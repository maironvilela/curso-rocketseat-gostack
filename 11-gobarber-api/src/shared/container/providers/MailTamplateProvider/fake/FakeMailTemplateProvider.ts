import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IEmailTemplateProvider from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IEmailTemplateProvider {
  public async parse(): Promise<string> {

    return "FakeMailTemplateProvider";
  }

}
