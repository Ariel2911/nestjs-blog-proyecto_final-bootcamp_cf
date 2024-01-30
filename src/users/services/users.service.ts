import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/usersSchema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ErrorManager } from 'src/utils/error.manager';

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
      const createUser = new this.userModel(createUserDto);

      return await createUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `The ${Object.keys(error.keyPattern)} already exist`,
        );
      }

      throw ErrorManager.createSignatureError(error.message);
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
      throw ErrorManager.createSignatureError(error.message);
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
      throw ErrorManager.createSignatureError(error.message);
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
      const UpdatedUser = await this.userModel
        .updateOne({ _id: id }, updateUserDto)
        .lean();

      if (!UpdatedUser.acknowledged) return 'Could not update user';

      return 'Updated user';
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `The ${Object.keys(error.keyPattern)} already exist`,
        );
      }

      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   *
   * @param id string
   * @returns Promise<any>
   */
  async deleteUser(id: string): Promise<any> {
    try {
      const deletedUser = await this.userModel.deleteOne({ _id: id }).lean();

      if (deletedUser.deletedCount === 0) return 'Could not delete user';

      return 'User deleted';
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
