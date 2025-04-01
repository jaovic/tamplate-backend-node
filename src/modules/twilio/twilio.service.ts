import * as client from 'twilio';

export class TwilioService {
  private readonly client = client(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  async sendSms(to: string, code: string) {
    const formattedPhoneNumber = this.formatPhoneNumber(to);

    return await this.client.messages.create({
      body: `your code is: ${code}`,
      to: formattedPhoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
  }

  private formatPhoneNumber(phone: string): string {
    const cleanedPhone = phone.replace(/\D/g, '');
    return `+55${cleanedPhone}`;
  }
}
