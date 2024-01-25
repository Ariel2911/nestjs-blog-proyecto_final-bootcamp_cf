import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from '../dto/login.auth.dto';

@ApiTags('Login')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 201,
    description: 'Logged in user. Returns access_token',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. The data provided does not belong to any user',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
