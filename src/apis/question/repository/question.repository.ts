import { Injectable } from "@nestjs/common";
import { Question } from "@prisma/client";
import { join } from "path";
import { PrismaService } from "src/common/prisma/prisma.service";

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
}