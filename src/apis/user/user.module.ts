import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { QuestionModule } from '../question/question.module';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Global()
@Module({
  imports: [QuestionModule, PrismaModule],
  controllers: [UsersController],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
})
export class UserModule {}
