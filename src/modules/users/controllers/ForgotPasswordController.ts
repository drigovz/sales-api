import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

class ForgotPasswordControlle {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    sendForgotPasswordEmail.execute({
      email,
    });

    return res.status(204).json();
  }
}

export default ForgotPasswordControlle;
