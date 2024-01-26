import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/usersSchema';
import { LoggedUser } from 'src/interfaces/loggedUser';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param email string
   * @returns Promise<User>
   */
  async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  /**
   *
   * @param email string
   * @param password string
   * @returns Promise<LoggedUser | null>
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<LoggedUser | null> {
    const user = await this.findUser(email);

    if (user && user.email === email && user.password === password) {
      return { name: user.name, isAdmin: user.isAdmin };
    }
    return null;
  }

  /**
   * 
   * @param user { name: string }
   * @returns Promise<{
        access_token: string;
      }
   */
  async login(user: LoggedUser) {
    const payload = { ...user };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
