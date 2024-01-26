import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/usersSchema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

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

  /**
   *
   * @returns Promise<any>
   */
  async getUsers(): Promise<any> {
    try {
      const users = await this.userModel.find().lean();

      const listUsers = users.map((user) => {
        return {
          _id: user._id,
          name: user.name,
        };
      });

      return listUsers;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('unknown error');
    }
  }

  /**
   *
   * @param id string
   * @returns Promise<any>
   */
  async getUser(id: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ _id: id }).lean();

      const findUser = {
        _id: user._id,
        name: user.name,
      };

      return findUser;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('unknown error');
    }
  }

  /**
   *
   * @param id string
   * @param updateUserDto UpdateUserDto
   * @returns Promise<any>
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const UpdatedUser = this.userModel
        .updateOne({ _id: id }, updateUserDto)
        .lean();

      return UpdatedUser;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('unknown error');
    }
  }
}
