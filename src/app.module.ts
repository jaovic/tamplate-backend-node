import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TwilioModule } from './modules/twilio/twilio.module';

@Module({
  imports: [AuthModule, TwilioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
