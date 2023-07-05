import { HttpException } from "@nestjs/common";

export class QuestionNotFoundException extends HttpException {
     private constructor() {
          super("Question not found", 404);
     }

     static EXCEPTION: HttpException = new QuestionNotFoundException();
}