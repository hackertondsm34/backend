import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from 'src/common/interfaces/context';
import { Request } from 'express';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getAllQuestion() {
    return this.questionService.getAllQuestions();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('type') type: string,
    @Req() request: Request & IAuthUser,
  ) {
    return this.questionService.create({
      title,
      content,
      type,
      user_id: request.user.user_id,
    });
  }

  @Get('/specific')
  @UseGuards(AuthGuard('jwt'))
  getSpecificQuestion(@Query('id') id: string) {
    return this.questionService.getSpecificQuestion({ id });
  }

  @Post('/answer')
  @UseGuards(AuthGuard('jwt'))
  answer(
    @Query('id') question_id: string,
    @Body('answer') answer: string,
    @Req() request: Request & IAuthUser,
  ) {
    return this.questionService.answer({
      question_id,
      answer,
      user_id: request.user.user_id,
    });
  }

  @Get('/my')
  @UseGuards(AuthGuard('jwt'))
  myQuestions(@Req() request: Request & IAuthUser) {
    return this.questionService.myQuestions({ user_id: request.user.user_id });
  }
}
