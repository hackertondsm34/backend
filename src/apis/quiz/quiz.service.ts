import { Injectable } from "@nestjs/common";
import { QuizRepository } from "./repository/quiz.repository";
import { CheckAnswerReponse, GetQuizzesResponse } from "./quiz.dto";
import { UserRepository } from "../user/repository/user.repository";

@Injectable()
export class QuizService {

     constructor(
          private quizRepository: QuizRepository,
          private userRepository: UserRepository
     ) {}

     async getQuizzes(): Promise<GetQuizzesResponse> {
          const quiz = await this.quizRepository.queryAllQuizzes();

          return {
               questions: quiz.map(quiz => {
                    return {
                         quiz_id: quiz.quiz_id,
                         content: quiz.content,
                         image_url: quiz.image_url,
                         type: quiz.type,
                         correct_rate: quiz.corract_count / quiz.attampt_count * 100
                    }
               })
          }
     }

     async checkAnswer(questionId: string, answer: string, userId: string): Promise<CheckAnswerReponse> {
          const quiz = await this.quizRepository.queryQuizzById(questionId);
          
          const user = await this.userRepository.findUserByEmail(userId);

          const isCorrect = quiz.answer === answer;

          quiz.attampt_count++;
          if (isCorrect) {
               quiz.corract_count++;
               user.total_score += quiz.score;
          }
          this.quizRepository.updateQuizz(quiz);
          this.userRepository.updateUser(user);

          return {
               isCorrect,
               answer: quiz.answer
          }
     }
}