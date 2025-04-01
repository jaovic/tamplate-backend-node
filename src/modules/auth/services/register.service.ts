import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../repository/auth.repository';
import {
  IRegisterService,
  IRegisterUser,
} from '../structure/IService.structure';
import { IAuthRepository } from '../structure/IRepository.structure';
import { TwilioService } from 'src/modules/twilio/twilio.service';

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    @Inject(TwilioService)
    private readonly TwilioService: TwilioService,
  ) {}

  async execute(registerUser: IRegisterUser): Promise<Partial<User>> {
    const { email, password } = registerUser;

    const user = await this.authRepository.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    registerUser.password = await bcrypt.hash(password, 10);

    const newUser = await this.authRepository.createUser(registerUser);

    if (!newUser) {
      throw new ConflictException('User not created');
    }

    const code = Math.floor(Math.random() * 9000) + 1000;
    await Promise.all([
      this.authRepository.saveCode(newUser.userId!, code.toString()),
      this.TwilioService.sendSms(newUser.phone!, code.toString()),
    ]);

    return {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      cpf: newUser.cpf,
    };
  }
}
