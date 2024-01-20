import { Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Created user',
  })
  @ApiResponse({
    status: 400,
    description: 'Are missing or the type of data is incorrect',
  })
  createUser() {
    return this.usersService.createUser();
  }
}
