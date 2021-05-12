import handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParserMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

class HandlebarsMailTemplate {
  public async parser({ template, variables }: IParserMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;
