import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const id = req.user.id;

    const user = await showProfile.execute({ id });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({ id, name, email, password, old_password });

    return res.json(user);
  }
}

export default ProfileController;
