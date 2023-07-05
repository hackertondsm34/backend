import { Injectable } from '@nestjs/common';
import { IUserId } from './interfaces/question-sevice';
import { CreateQuestionRequest, QueryQeustionsResponse, QuestionResponse, SpecificQuestionResponse } from './question.dto';
import { QuestionRepository } from './repository/question.repository';
import { UserRepository } from '../user/repository/user.repository';
import { AnswerRepository } from './repository/answer.repository';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository
  ) {}

  async createQeustion(request: CreateQuestionRequest, userEmail: string) {
    const user = await this.userRepository.findUserByEmail(userEmail);

    this.questionRepository.saveQuestion({
      title: request.title,
      content: request.content,
      user_id: user.user_id,
      type: request.type
    });
  }

  async getAllQuestions(): Promise<QueryQeustionsResponse> {
    const questions = await this.questionRepository.findAllQuestions();

    const questionsResponse: QuestionResponse[] = questions.map(question => {
      return {
        id: question.question_id,
        title: question.title,
        type: question.type,
        created_at: question.created_at
      }
    });

    return { questions: questionsResponse };
  }

  async getSpecificQuestion(questionId: string): Promise<SpecificQuestionResponse> {
    const question = await this.questionRepository.findByIdWithAnswers(questionId);

    return {
      title: question.title,
      content: question.content,
      type: question.type,
      created_date: question.created_at,
      answers: question.answers.map(answer => {
        return {
          user_name: answer.user.name,
          content: answer.answer,
          created_date: answer.created_at
        }
      })
    };
  }

  async answerQuestion(questionId: string, userEmail: string, answer: string) {
    const user = await this.userRepository.findUserByEmail(userEmail);
    const question = await this.questionRepository.findById(questionId);

    this.answerRepository.saveAnswer({
      answer, user_id: user.user_id, question_id: question.question_id
    });
  }

  async myQuestions(user: IUserId) {
    const questions = await this.questionRepository.findAllQuestionsByUserId(user.user_id);
    return { questions };
  }
}
