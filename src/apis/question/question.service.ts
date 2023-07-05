import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { IApply } from './interfaces/question-service.interface';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: Prisma.QuestionCreateInput) {
    return await this.prismaService.question.create({ data: params });
  }

  async getAllQuestions() {
    const questions = await this.prismaService.question.findMany();
    return {
      questions: questions.map((e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user_id, question_id, content, ...others } = e;
        return { id: question_id, ...others };
      }),
    };
  }

  async getSpecificQuestion({ id }: { id: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { question_id, user_id, ...others } =
      await this.prismaService.question.findUnique({
        where: { question_id: id },
      });
    const answers = await this.prismaService.answer.findMany({
      where: { question_id: id },
      include: { user: true },
    });
    return {
      ...others,
      answers: answers.map((e) => {
        const { user, created_at, answer } = e;
        return { created_at, answer, user_name: user.name };
      }),
    };
  }
  async apply(data: Prisma.AnswerCreateInput) {
    return await this.prismaService.answer.create({ data });
  }
}
