import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

interface ErrorResponse {
  statusCode: any;
  message: string;
  timeStamp: Date;
  url: string;
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

          const isHandled = exception instanceof HttpException;
          const status = isHandled ? exception.getStatus() : 500;
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
