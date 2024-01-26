import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'Created user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns a message with the error found in the received data',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'User List' })
  @ApiResponse({
    status: 200,
    description: 'Create a user list',
  })
  getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }

  @Get()
  @ApiOperation({ summary: 'User' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user corresponding to the received id',
  })
  @Get(':id')
  getUser(@Param('id') id: string): Promise<any> {
    return this.usersService.getUser(id);
  }
}
