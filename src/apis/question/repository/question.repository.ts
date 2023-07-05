import { Injectable } from "@nestjs/common";
import { Prisma, Question } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";
import { QuestionNotFoundException } from "../question.exceptions";

@Injectable()
export class QuestionRepository {
     constructor(private prismaService: PrismaService) {}

     async findAllQuestionsByUserId(userId: string) {
          return await this.prismaService.question.findMany({
               where: {user_id: userId},
               include: {
                    _count: {
                         select: {answers: true}
                    }
               }
          });
     }

     async findAllQuestions(): Promise<Question[]> {
          return this.prismaService.question.findMany();
     }

     async saveQuestion(question: Prisma.QuestionUncheckedCreateInput) {
          await this.prismaService.question.create({
               data: question
          });
     }

     async findById(questionId: string): Promise<Question> {
          const question = await this.prismaService.question.findUnique({
               where: {question_id: questionId}
          });

          if (question == null) {
               throw QuestionNotFoundException.EXCEPTION;
          }

          return question;
     }

     async findByIdWithAnswers(questionId: string) {
          const question = await this.prismaService.question.findUnique({
               where: {question_id: questionId},
               include: {answers: {
                    include: {user: true}
               }}
          });

          if (question == null) {
               throw QuestionNotFoundException.EXCEPTION;
          }

          return question;
     }
}