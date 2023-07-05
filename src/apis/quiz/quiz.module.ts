import { Module, Query } from "@nestjs/common";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";
import { QuizRepository } from "./repository/quiz.repository";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
     imports: [PrismaModule],
     controllers: [QuizController],
     providers: [QuizService, QuizRepository],
     exports: [QuizRepository]
})
export class QuizModule {}