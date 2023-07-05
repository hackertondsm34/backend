import { Request, Response } from 'express';
export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
export interface IAuthUser {
  user?: {
    user_id: string;
  };
}
