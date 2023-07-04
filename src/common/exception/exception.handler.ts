import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";


interface ErrorResponse {
     statusCode: number;
     message: string;
     timeStamp: Date;
     url: string;
}

export class BaseExeption extends Error{

     message: string;
     status: HttpStatus;

     constructor(message: string, status: HttpStatus) {
          super();
          this.status = status;
          this.message = message;
     }
}

@Catch()
export class ExceptionHandler implements ExceptionHandler {
     catch(exception: unknown, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const response = ctx.getResponse();
          const request = ctx.getRequest<Request>();

          const isHandled = exception instanceof BaseExeption;
          const status = isHandled ? exception.status : 500;
          const message = isHandled ? exception.message : 'Internal Server Error';

          if (!isHandled) {
               console.error(exception);
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