import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../repository/auth.repository';
import {
  ICreateUserService,
  ILoginReturn,
} from '../structure/IService.structure';
import { IAuthRepository } from '../structure/IRepository.structure';
import { SingUpAuthDto } from '../dto/create-user.dto';
import { LoginAuthDto } from '../dto/login-user.dto';
import { GetTokenService } from './getToken.service';

@Injectable()
export class AuthService implements ICreateUserService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    @Inject(GetTokenService)
    private readonly getTokenService: GetTokenService,
  ) {}

  async execute(createAuthDto: SingUpAuthDto): Promise<Partial<User>> {
    const { email, password } = createAuthDto;

    const user = await this.authRepository.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    createAuthDto.password = await bcrypt.hash(password, 10);

    const newUser: Partial<User> =
      await this.authRepository.createUser(createAuthDto);

    return {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      cpf: newUser.cpf as string,
    };
  }

  async login(email: string, password: string): Promise<true | null> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;
    return true;
  }

  async generateToken(loginAuthDto: LoginAuthDto): Promise<ILoginReturn> {
    const { email } = loginAuthDto;
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new ConflictException('User not found');
    }
    const { token, refreshToken } = await this.getTokenService.execute(
      user.userId,
      email,
    );
    return { token, refreshToken };
  }
}
