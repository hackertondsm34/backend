import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { QuestionRepository } from './repository/question.repository';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionRepository]
})
export class QuestionModule {}
