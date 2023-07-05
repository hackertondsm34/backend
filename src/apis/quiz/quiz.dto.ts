import { QuizType } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export interface GetQuizzesResponse {
     questions: QuizDto[]
}

export interface QuizDto {
     quiz_id: string,
     content: string,
     image_url: string,
     type: QuizType
}

export interface CheckAnswerReponse {
     isCorrect: boolean,
     answer: string
}

export class CheckAnswerReuqset {

     @IsString()
     @IsNotEmpty()
     answer: string
}