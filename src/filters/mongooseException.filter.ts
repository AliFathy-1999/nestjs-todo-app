import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { MongoError, } from 'mongodb';
import {Error} from 'mongoose';

@Catch(MongoError,Error.ValidationError)
export class MongooseFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let message = exception.message
        let statusCode = ctx.getRequest().statusCode; 
        
        if(exception.code  === 11000) {
            // Handle duplicate key error            
            message = `Value of field ${Object.keys(exception["keyPattern"])[0]} is duplicated please choose another one`
            statusCode =  HttpStatus.UNPROCESSABLE_ENTITY;
        }else if(exception instanceof Error.ValidationError){
            // Handle Mongoose Validation error
            message = `${Object.keys(exception["errors"]).join(' ')} is not valid`
            statusCode = HttpStatus.BAD_REQUEST; 
        }else {
            throw exception;
        }

        response.status(statusCode).json({
            statusCode,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
            errorSource: exception.name,
            message,
            path: ctx.getRequest().url,
        });
    }
}
