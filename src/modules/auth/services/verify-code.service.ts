import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import {
  IVerifyCode,
  IVerifyCodeService,
} from '../structure/IService.structure';

@Injectable()
export class VerifyCodeService implements IVerifyCodeService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}
  async execute(verifyCode: IVerifyCode): Promise<boolean> {
    const { email, codeSms } = verifyCode;
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.codeSms == 'verificated') {
      throw new HttpException('user already verified', HttpStatus.CONFLICT);
    }
    if (user.codeSms !== codeSms) {
      throw new HttpException('Code not verified', HttpStatus.UNAUTHORIZED);
    }
    await this.authRepository.updateCode(user.userId);
    return true;
  }
}
