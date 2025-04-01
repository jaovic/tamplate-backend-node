import { IsNotEmpty, IsEmail, Matches, IsString } from 'class-validator';
import { MessagesHelper } from 'src/modules/helpers/message.helper';
import { regexHelper } from 'src/modules/helpers/regex.helper';

export class SingUpAuthDto {
  @IsNotEmpty({ message: MessagesHelper.EMAIL_REQUIRED })
  @IsEmail({}, { message: MessagesHelper.EMAIL_INVALID })
  @IsString()
  email: string;

  @IsNotEmpty({ message: MessagesHelper.PASSWORD_REQUIRED })
  @Matches(regexHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  @IsString()
  password: string;

  @IsNotEmpty({ message: MessagesHelper.PHONE_REQUIRED })
  @Matches(regexHelper.phone, { message: MessagesHelper.PHONE_INVALID })
  @IsString()
  phone: string;

  @IsNotEmpty({ message: MessagesHelper.NAME_REQUIRED })
  @IsString()
  name: string;

  @IsNotEmpty({ message: MessagesHelper.CPF_REQUIRED })
  @Matches(regexHelper.cpf, { message: MessagesHelper.CPF_INVALID })
  @IsString()
  cpf: string;
}
