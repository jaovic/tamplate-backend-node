import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from '../../helpers/message.helper';

export class verifyCodeAuthDto {
  @IsNotEmpty({ message: MessagesHelper.EMAIL_REQUIRED })
  @IsEmail({}, { message: MessagesHelper.EMAIL_INVALID })
  email: string;
  @IsNotEmpty({ message: MessagesHelper.CODE_REQUIRED })
  codeSms: string;
}
