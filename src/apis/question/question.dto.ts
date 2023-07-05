import { IsNotEmpty, IsString } from "class-validator"

export interface QueryQeustionsResponse {
     questions: QuestionResponse[]
}

export interface QuestionResponse {
     id: string
     title: string
     type: string
     created_at: Date
}

export class CreateQuestionRequest {
     @IsString()
     @IsNotEmpty()
     title: string

     @IsString()
     @IsNotEmpty()
     content: string

     @IsString()
     @IsNotEmpty()
     type: string
}

export class CreateAnswerRequest {

     @IsString()
     @IsNotEmpty()
     answer: string
}

export interface SpecificQuestionResponse {
     title: string
     content: string
     type: string
     created_date: Date
     answers: AnswerResponse[]
}

export interface AnswerResponse {
     user_name: string
     content: string
     created_date: Date
}