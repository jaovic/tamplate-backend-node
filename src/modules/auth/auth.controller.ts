import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './services/register.service';
import { SingUpAuthDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from './dto/login-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() singUpAuthDto: SingUpAuthDto): Promise<Partial<User>> {
    return this.authService.execute(singUpAuthDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.generateToken(loginAuthDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() req: Request) {
    console.log('🚀 ~ AuthController ~ logout ~ req:', req);
    console.log('Logout request received');
  }
}
