import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { QuestionRepository } from './repository/question.repository';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AnswerRepository } from './repository/answer.repository';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, AnswerRepository],
  exports: [QuestionRepository]
})
export class QuestionModule {}
