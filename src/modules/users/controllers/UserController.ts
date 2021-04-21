import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = listUsers.execute();
    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProduct = new ShowUserService();
    const user = await showProduct.execute({ id });

    return res.json(user);
  }
}

export default UserController;
