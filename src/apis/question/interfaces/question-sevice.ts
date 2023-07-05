export interface IgetSpecificQuestion {
  id: string;
}
export interface IUserId {
  user_id: string;
}
export interface IAnswer extends IUserId {
  question_id: string;
}
