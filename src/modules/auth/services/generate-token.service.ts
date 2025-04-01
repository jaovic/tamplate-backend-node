import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { IAuthRepository } from '../structure/IRepository.structure';
import {
  IGenerateToken,
  IGenerateTokenRetun,
  IGenerateTokenService,
} from '../structure/IService.structure';
import { GetTokenService } from './get-token.service';

@Injectable()
export class GenerateTokenService implements IGenerateTokenService {
  constructor(
    @Inject(GetTokenService)
    private readonly getTokenService: GetTokenService,
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}
  async execute(generateToken: IGenerateToken): Promise<IGenerateTokenRetun> {
    const { email } = generateToken;
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new ConflictException('User not found');
    }
    const { token, refreshToken } = await this.getTokenService.execute({
      userId: user.userId,
      email,
    });
    return { token, refreshToken };
  }
}
