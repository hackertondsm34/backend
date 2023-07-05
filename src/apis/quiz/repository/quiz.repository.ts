import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { QuizDto } from "../quiz.dto";
import { Quiz } from "@prisma/client";

@Injectable()
export class QuizRepository {
     
     constructor(
          private prismaService: PrismaService
     ) {}

     async queryAllQuizzes(): Promise<QuizDto[]> {
          return this.prismaService.quiz.findMany({
               select: {
                    quiz_id: true,
                    content: true,
                    image_url: true,
                    type: true
               }
          });
     }

     async queryQuizzById(quizId: string): Promise<Quiz> {
          return this.prismaService.quiz.findUniqueOrThrow({
               where: {quiz_id: quizId}
          });
     }
}