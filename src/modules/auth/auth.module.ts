import { Module } from '@nestjs/common';
import { AuthService } from './services/register.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/modules/user/user.service';
import { AuthRepository } from './repository/auth.repository';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { GetTokenService } from './services/getToken.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AuthRepository,
    PrismaService,
    LocalStrategy,
    GetTokenService,
  ],
})
export class AuthModule {}
