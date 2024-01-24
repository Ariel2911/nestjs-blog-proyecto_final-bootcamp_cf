import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/usersSchema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   *
   * @param createUserDto
   * @returns Promise<User>
   */

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userModel.create(createUserDto);

      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `The ${Object.keys(error.keyPattern)} already exist`,
        );
      }

      console.log(error);

      throw new InternalServerErrorException("Can't create user");
    }
  }
}
