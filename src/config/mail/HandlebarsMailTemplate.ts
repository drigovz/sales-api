import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParserMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

class HandlebarsMailTemplate {
  public async parser({ template, variables }: IParserMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(template, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;
