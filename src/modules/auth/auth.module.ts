import { Module } from '@nestjs/common';
import { RegisterService } from './services/register.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { GetTokenService } from './services/get-token.service';
import { LoginService } from './services/login.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { LogoutUserService } from './services/logout.service';
import { GenerateTokenService } from './services/generate-token.service';
import { TwilioService } from '../twilio/twilio.service';
import { VerifyCodeService } from './services/verify-code.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterService,
    AuthRepository,
    PrismaService,
    LocalStrategy,
    GetTokenService,
    LoginService,
    JwtStrategy,
    LogoutUserService,
    GenerateTokenService,
    TwilioService,
    VerifyCodeService,
  ],
})
export class AuthModule {}
