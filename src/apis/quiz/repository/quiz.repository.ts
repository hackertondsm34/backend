import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { QuizDto } from "../quiz.dto";
import { Prisma, Quiz } from "@prisma/client";

@Injectable()
export class QuizRepository {
     
     constructor(
          private prismaService: PrismaService
     ) {}

async queryAllQuizzes(): Promise<Quiz[]> {
          return await this.prismaService.quiz.findMany();
     }

     async queryQuizzById(quizId: string): Promise<Quiz> {
          return await this.prismaService.quiz.findUniqueOrThrow({
               where: {quiz_id: quizId}
          });
     }

     async saveQuizz(quiz: Prisma.QuizCreateInput) {
          await this.prismaService.quiz.create({
               data: quiz
          });
     }

     async updateQuizz(quiz: Quiz) {
          await this.prismaService.quiz.update({
               where: {quiz_id: quiz.quiz_id},
               data: {
                    attampt_count: quiz.attampt_count,
                    corract_count: quiz.corract_count
               }
          });
     }
}