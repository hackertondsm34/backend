export interface MyPageResponse {
     name: string
     totalScore: number
     questions: QuestionResponse[]
}

export interface QuestionResponse {
     questionId: string
     title: string
     content: string
     replayCount: number
}