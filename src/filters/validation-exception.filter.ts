// src/common/filters/validation-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message = exception.message; 
    response.status(status).json({
        statusCode: status,
        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
        errorSource: "Validation Exception",
        path: request.url,
        message,
    });
  }
}
