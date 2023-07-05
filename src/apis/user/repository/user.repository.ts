import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async saveUser(user: Prisma.UserCreateInput): Promise<void> {
    await this.prismaService.user.create({
      data: user,
    });
  }

  async findUserById(userId: string): Promise<User> {
     return await this.prismaService.user.findUniqueOrThrow({
          where: { user_id: userId }
     });
  }

  async updateUser(user: User) {
     await this.prismaService.user.update({
          where: {user_id: user.user_id},
          data: {
               total_score: user.total_score
          }
     });
  }
}
