import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
