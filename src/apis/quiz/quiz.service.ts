import { Injectable } from "@nestjs/common";
import { QuizRepository } from "./repository/quiz.repository";
import { CheckAnswerReponse, GetQuizzesResponse } from "./quiz.dto";

@Injectable()
export class QuizService {

     constructor(
          private quizRepository: QuizRepository
     ) {}

     async getQuizzes(): Promise<GetQuizzesResponse> {
          const quiz = await this.quizRepository.queryAllQuizzes();

          return {
               questions: quiz
          }
     }

     async checkAnswer(questionId: string, answer: string): Promise<CheckAnswerReponse> {
          const quiz = await this.quizRepository.queryQuizzById(questionId);

          const isCorrect = quiz.answer === answer

          quiz.attampt_count++;
          if (isCorrect) quiz.corract_count++;
          
          return {
               isCorrect,
               answer: quiz.answer
          }
     }
}