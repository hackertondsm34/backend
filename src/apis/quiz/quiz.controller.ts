import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, UseGuards } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CheckAnswerReponse, CheckAnswerReuqset, GetQuizzesResponse } from "./quiz.dto";
import { AuthGuard } from "@nestjs/passport";
import { IAuthUser } from "src/common/interfaces/context";
import { REQUEST } from "@nestjs/core";

@Controller('quiz')
export class QuizController {

     constructor(
          private quizService: QuizService,

          @Inject(REQUEST)
          private request: IAuthUser
     ) {}

     @Get()
     async getQuizzes(): Promise<GetQuizzesResponse> {
          return this.quizService.getQuizzes();
     }

     @UseGuards(AuthGuard('jwt'))
     @Patch('check/:quizId')
     async checkAnswer(@Param('quizId', ParseUUIDPipe) quizId: string, @Body() request: CheckAnswerReuqset): Promise<CheckAnswerReponse> {
          return await this.quizService.checkAnswer(quizId, request.answer, this.request.user.user_id);
     }
}