import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transport = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transport.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Reset your password',
      text: body,
    });

    console.log(`\nMessage Id: ${message.messageId}`);
    console.log(`\nPreview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default EtherealMail;
