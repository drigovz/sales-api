import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import ListUserService from '../../../services/ListUserService';
import { classToClass } from 'class-transformer';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();

    return res.json(classToClass(users));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    return res.json(classToClass(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });

    return res.json({ message: 'User deleted!' });
  }
}

export default UserController;
