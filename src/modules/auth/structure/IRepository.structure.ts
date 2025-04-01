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
  logout(userId: string): Promise<boolean>;
  findById(userId: string): Promise<Partial<User> | null>;
  saveCode(userId: string, code: string): Promise<boolean>;
  updateCode(userId: string, codeSms: string): Promise<boolean>;
}
