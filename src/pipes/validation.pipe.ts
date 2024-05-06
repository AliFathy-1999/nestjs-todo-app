import { PipeTransform, Injectable, Type, BadRequestException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { getClassSchema } from 'joi-class-decorators';

@Injectable()
export class ValidationPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const bodyDto = metatype; // Dto Schema
    const bodyInput = plainToInstance(bodyDto, value); // Convert plain Dto object to instance to transform it manually
    const bodySchema = getClassSchema(bodyDto); // Get Joi Schema from Dto
    const error = bodySchema.validate(bodyInput).error;  
    if (error) {
      throw new BadRequestException(`Validation failed: ${error.details.map((err) => err.message).join(', ')}.`);  
    }
    return value;
  }
}
interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}