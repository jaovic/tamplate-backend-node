import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TwilioModule } from './modules/twilio/twilio.module';

@Module({
  imports: [UserModule, AuthModule, TwilioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
