import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({ id, name, email, password, old_password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found!');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);
    // * if id of userUpdateEmail.id is different to id parameter,
    //   so dont update email, because this email exists on database. Email is used for other user.
    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError('There already user with this email!');
    }
    // * if id not equal, the user trying to use valid email, the email addres is from the user himself.

    // if exists password but not exist old_password, throw new exception.
    if (password && !old_password) {
      throw new AppError('Old password is required!');
    }

    // password and old_password informed
    if (password && old_password) {
      // check the old_password is equal to password saved on database
      const checkedOldPassword = await compare(old_password, user.password);

      // if old_password dont equal to the password saved on database
      if (checkedOldPassword) {
        throw new AppError('Old password does not match!');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
