import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repository/auth.repository';
import {
  IGetTokenRetun,
  IGetTokenService,
} from '../structure/IService.structure';
import { IAuthRepository } from '../structure/IRepository.structure';

@Injectable()
export class GetTokenService implements IGetTokenService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async execute(userId: string, email: string): Promise<IGetTokenRetun> {
    const payload = { sub: userId, email: email };
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '15m',
      }),
    ]);
    await Promise.all([
      this.authRepository.updateRefreshToken(userId, refreshToken),
      this.authRepository.updateToken(userId, token),
    ]);
    return { token, refreshToken };
  }
}
