// src/common/filters/validation-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { getClassSchema } from 'joi-class-decorators';
import * as moment from 'moment';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from 'src/users/dto/signIn.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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
