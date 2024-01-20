import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser() {
    return 'Created user';
  }
}
