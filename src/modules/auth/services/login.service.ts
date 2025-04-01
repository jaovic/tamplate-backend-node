import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { ILoginService, ILoginUser } from '../structure/IService.structure';
import { IAuthRepository } from '../structure/IRepository.structure';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}
  async execute(loginUser: ILoginUser): Promise<true | null> {
    const { email, password } = loginUser;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.codeSms) {
      throw new BadRequestException('User not verified');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return true;
  }
}
