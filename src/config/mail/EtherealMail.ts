import AppError from '@shared/errors/AppError';
import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParserMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParserMailTemplate;
}

class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    const transport = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    try {
      const message = await transport.sendMail({
        from: {
          name: from?.name || 'Support of Sales API',
          address: from?.email || 'team@salesapi.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await mailTemplate.parser(templateData),
      });

      console.log(`\nMessage Id: ${message.messageId}`);
      console.log(`\nPreview URL: ${nodemailer.getTestMessageUrl(message)}`);
    } catch (error) {
      throw new AppError(`Error when try to send mail:\n ${error}`, 501);
    }
  }
}

export default EtherealMail;
