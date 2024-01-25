import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/usersSchema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUser(email);

    if (user && user.email === email && user.password === password) {
      return { name: user.name };
    }
    return null;
  }
}
