import { User } from '@prisma/client';

export interface ICreateUserRpository {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export interface IAuthRepository {
  createUser(createAuthDto: ICreateUserRpository): Promise<Partial<User>>;
  findByEmail(email: string): Promise<User | null>;
  updateRefreshToken(userId: string, refreshToken: string): Promise<boolean>;
  updateToken(userId: string, token: string): Promise<boolean>;
}
