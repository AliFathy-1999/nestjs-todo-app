// src/common/filters/validation-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const validationErrors = exception.getResponse() as { message: string[]; error: string; statusCode: number };
        
    response.status(validationErrors.statusCode).json({
      // message: 'Validation error',
      errors: validationErrors.message[0],
    //   error: validationErrors.error,
    //   statusCode: validationErrors.statusCode,
    });
  }
}
