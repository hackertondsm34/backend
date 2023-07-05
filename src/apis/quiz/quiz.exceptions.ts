import { HttpException } from "@nestjs/common";

export class QuizNotFoundException extends HttpException{
     private constructor() {
          super("Quiz not found", 404);
     }

     static EXCEPTION: HttpException = new QuizNotFoundException(); 
}