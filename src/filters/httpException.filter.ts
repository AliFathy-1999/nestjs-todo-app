import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.getResponse()["message"][0]
    const message = status === 400 ? errorMessage : exception.message
    response.status(status).json({
        statusCode: status,
        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
        errorSource: exception.name,
        path: request.url,
        message,
    });
  }
}