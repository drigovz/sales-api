import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json({ avatar: user.avatar, message: 'Avatar updated successfull!' });
  }
}

export default UserAvatarController;
