import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from 'src/common/interfaces/context';
import { Request } from 'express';
import { CreateAnswerRequest, CreateQuestionRequest, QueryQeustionsResponse } from './question.dto';
import { REQUEST } from '@nestjs/core';

@Controller('questions')
export class QuestionController {
  constructor(
      private readonly questionService: QuestionService,
    
      @Inject(REQUEST)
      private request: IAuthUser
    ) {}

  @Get()
  async getAllQuestion(): Promise<QueryQeustionsResponse> {
    return await this.questionService.getAllQuestions();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createQuestion(@Body() request: CreateQuestionRequest) {
    this.questionService.createQeustion(request, this.request.user.user_id);
  }

  @Get('/:questionId')
  async getQuestionDetail(@Param('questionId') questionId: string) {
    return await this.questionService.getSpecificQuestion(questionId);
  }

  @Post('/answer')
  @UseGuards(AuthGuard('jwt'))
  async answerQuestion(@Body() request: CreateAnswerRequest, @Query('id') questionId: string) {
    return this.questionService.answerQuestion(questionId, this.request.user.user_id, request.answer);
  }

  @Get('/my')
  @UseGuards(AuthGuard('jwt'))
  async myQuestions(@Req() request: Request & IAuthUser) {
    return this.questionService.myQuestions({ user_id: request.user.user_id });
  }
}
