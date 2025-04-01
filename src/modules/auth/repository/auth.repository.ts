import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { IAuthRepository } from '../structure/IRepository.structure';
import { SingUpAuthDto } from '../dto/create-user.dto';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(createAuthDto: SingUpAuthDto): Promise<Partial<User>> {
    try {
      return await this.prisma.user.create({
        data: createAuthDto,
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    try {
      await this.prisma.user.updateMany({
        where: {
          userId,
        },
        data: { Refresh_Token: refreshToken },
      });
      return true;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async updateToken(userId: string, token: string): Promise<boolean> {
    try {
      await this.prisma.user.updateMany({
        where: { userId },
        data: { token },
      });
      return true;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }
}
