import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { QuestionModule } from '../question/question.module';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, QuestionModule],
  controllers: [UsersController],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
})
export class UserModule {}
