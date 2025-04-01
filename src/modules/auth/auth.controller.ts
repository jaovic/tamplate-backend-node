import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Inject,
} from '@nestjs/common';
import { SingUpAuthDto } from './dto/create-user.dto';

import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from './dto/login-user.dto';
import { RegisterService } from './services/register.service';
import { LogoutUserService } from './services/logout.service';
import { AuthenticatedUser } from './dto/auth-request.dto';
import { GenerateTokenService } from './services/generate-token.service';
import { verifyCodeAuthDto } from './dto/verify-code.dto';
import { VerifyCodeService } from './services/verify-code.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(RegisterService)
    private readonly registerService: RegisterService,
    @Inject(GenerateTokenService)
    private readonly generateTokenService: GenerateTokenService,
    @Inject(LogoutUserService)
    private readonly logoutUserService: LogoutUserService,
    @Inject(VerifyCodeService)
    private readonly verifyCodeService: VerifyCodeService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() singUpAuthDto: SingUpAuthDto): Promise<Partial<User>> {
    return this.registerService.execute(singUpAuthDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.generateTokenService.execute(loginAuthDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() req: AuthenticatedUser): Promise<boolean> {
    return this.logoutUserService.execute(req.user.userId);
  }

  @Post('verify-code')
  async verifyCode(@Body() verifyCode: verifyCodeAuthDto) {
    return await this.verifyCodeService.execute(verifyCode);
  }
}
