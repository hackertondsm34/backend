import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class AnswerRepository {

     constructor(
          private prismaService: PrismaService
     ) {}

     async saveAnswer(answer: Prisma.AnswerUncheckedCreateInput) {
          await this.prismaService.answer.create({
               data: answer
          });
     }
}