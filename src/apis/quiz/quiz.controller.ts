import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CheckAnswerReponse, CheckAnswerReuqset, GetQuizzesResponse } from "./quiz.dto";

@Controller('quiz')
export class QuizController {

     constructor(
          private quizService: QuizService
     ) {}

     @Get()
     async getQuizzes(): Promise<GetQuizzesResponse> {
          return this.quizService.getQuizzes();
     }

     @Patch('check/:quizId')
     async checkAnswer(@Param('quizId') quizId: string, @Body() request: CheckAnswerReuqset): Promise<CheckAnswerReponse> {
          return await this.quizService.checkAnswer(quizId, request.answer);
     }
}