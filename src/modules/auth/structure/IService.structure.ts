import { User } from '@prisma/client';

export interface IcreateUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export interface IRefreshTokenReturn {
  token: string;
  refreshToken: string;
}

export interface IGetTokenRetun {
  token: string;
  refreshToken: string;
}

export interface ILoginReturn {
  token: string;
  refreshToken: string;
}
export interface ICreateUserService {
  execute(data: IcreateUser): Promise<Partial<User>>;
}
export interface IGetTokenService {
  execute(id: string, email: string): Promise<IGetTokenRetun>;
}
export interface ILoginUserService {
  execute(user: any): Promise<ILoginReturn>;
}
export interface ILogoutUserService {
  execute(id: string): Promise<true>;
}
export interface IRefreshTokenService {
  execute(req: any): Promise<IRefreshTokenReturn>;
}
export interface IValidateUserService {
  execute(email: string, password: string): Promise<true>;
}
export interface IVerifyCodeService {
  execute(email: string, code: string): Promise<true>;
}
export interface IVerifyTokenService {
  execute(req: any): Promise<IRefreshTokenReturn>;
}
