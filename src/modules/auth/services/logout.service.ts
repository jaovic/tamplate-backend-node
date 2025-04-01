import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { ILogoutService } from '../structure/IService.structure';
import { IAuthRepository } from '../structure/IRepository.structure';

@Injectable()
export class LogoutUserService implements ILogoutService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(userId: string): Promise<true> {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const logout = await this.authRepository.logout(userId);

    if (!logout) {
      throw new InternalServerErrorException('Logout failed');
    }
    return true;
  }
}
