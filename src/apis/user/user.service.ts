import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { QuestionRepository } from "../question/repository/question.repository";
import { MyPageResponse, QuestionResponse } from "./user.dto";

@Injectable()
export class UserService {
     constructor(
          private userRepository: UserRepository,
          private questionRepository: QuestionRepository
     ) {}

     async myPage(userEmail: string): Promise<MyPageResponse> {
          const user = await this.userRepository.findUserByEmail(userEmail);
          const userQuestions = await this.questionRepository.findAllQuestionsByUserId(user.user_id);

          console.log(userQuestions);
          const questionReponse: QuestionResponse[] = userQuestions.map(question => {
               console.log(question);
               return {
                    questionId: question.question_id,
                    title: question.title,
                    content: question.content,
                    replayCount: question._count.answers
               }
          });

          return {
               name: user.name,
               totalScore: user.total_score,
               questions: questionReponse
          };
     }
}