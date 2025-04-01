import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../repository/auth.repository';
import {
  IRegisterService,
  IRegisterUser,
} from '../structure/IService.structure';
import { IAuthRepository } from '../structure/IRepository.structure';

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(registerUser: IRegisterUser): Promise<Partial<User>> {
    const { email, password } = registerUser;

    const user = await this.authRepository.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    registerUser.password = await bcrypt.hash(password, 10);

    const newUser = await this.authRepository.createUser(registerUser);

    return {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      cpf: newUser.cpf,
    };
  }
}
