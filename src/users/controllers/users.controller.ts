import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Admin } from 'src/auth/decorators/isAdmin.decorator';
import { OwnerAdministratorGuard } from 'src/auth/guards/ownerAdministrator.guard';
import { Owner } from 'src/auth/decorators/isOwner.decorator';

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

  @Get(':id')
  @ApiOperation({ summary: 'User' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user corresponding to the received id',
  })
  getUser(@Param('id') id: string): Promise<any> {
    return this.usersService.getUser(id);
  }

  @Admin(true)
  @Owner(true)
  @UseGuards(JwtAuthGuard, OwnerAdministratorGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description:
      'returns information corresponding to the result of the update',
  })
  @ApiResponse({
    status: 400,
    description: 'Error found in the received data',
  })
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
