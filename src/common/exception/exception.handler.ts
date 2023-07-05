import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import e from "express";

interface ErrorResponse {
  statusCode: number;
  message: string;
  timeStamp: Date;
  url: string;
}

export class BaseExeption extends Error {
  message: string;
  status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super();
    this.status = status;
    this.message = message;
  }
}

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
     catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const response = ctx.getResponse();
          const request = ctx.getRequest<Request>();

          
          if (exception instanceof BadRequestException) {
               return response.status(400).json(exception);
          }

          const isHandled = exception instanceof BaseExeption;
          const status = isHandled ? exception.status : 500;
          const message = isHandled ? exception.message : 'Internal Server Error';

    if (!isHandled) {
      console.error(exception);
    }

          if (exception instanceof BadRequestException) {
               
          } 
          const jsonResponse: ErrorResponse = {
               statusCode: status,
               message: message,
               url: request.url,
               timeStamp: new Date()
          };
          
          response.status(status).json(jsonResponse);
     }
}
