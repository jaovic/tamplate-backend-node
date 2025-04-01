import { User } from '@prisma/client';

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export interface IGetTokenRetun {
  token: string;
  refreshToken: string;
}

export interface IGetToken {
  userId: string;
  email: string;
}

export interface ILoginReturn {
  token: string;
  refreshToken: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IGenerateToken {
  email: string;
  password: string;
}

export interface IGenerateTokenRetun {
  token: string;
  refreshToken: string;
}

export interface IVerifyCode {
  email: string;
  codeSms: string;
}

export interface IRegisterService {
  execute(registerUser: IRegisterUser): Promise<Partial<User>>;
}
export interface IGetTokenService {
  execute(getToken: IGetToken): Promise<IGetTokenRetun>;
}

export interface ILoginService {
  execute(dataLogin: ILoginUser): Promise<true | null>;
}

export interface IGenerateTokenService {
  execute(generateToken: IGenerateToken): Promise<IGenerateTokenRetun>;
}

export interface ILogoutService {
  execute(userId: string): Promise<boolean>;
}

export interface IVerifyCodeService {
  execute(verifyCode: IVerifyCode): Promise<boolean>;
}
