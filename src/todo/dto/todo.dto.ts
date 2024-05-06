import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import validationPatterns from "src/interfaces/patterns";
import { Types } from 'mongoose';
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { Expose } from "class-transformer";
import { CREATE, UPDATE } from "nestjs-joi";
import * as Joi from "joi";

const { CHARACTER_NUMBERS_PATTERN } = validationPatterns
@JoiSchemaOptions({
    allowUnknown: true,
})
export class todoDto{

    @Expose() @JoiSchema([CREATE], Joi.string().trim().required().min(3).max(100).pattern(CHARACTER_NUMBERS_PATTERN.pattern).message(CHARACTER_NUMBERS_PATTERN.message('Todo name')))
    @Expose() @JoiSchema([UPDATE], Joi.string().trim().optional().min(3).max(100).pattern(CHARACTER_NUMBERS_PATTERN.pattern).message(CHARACTER_NUMBERS_PATTERN.message('Todo name')))
    title: string;

    @Expose() @JoiSchema([CREATE], Joi.string().trim().required().min(3).max(100).pattern(CHARACTER_NUMBERS_PATTERN.pattern).message(CHARACTER_NUMBERS_PATTERN.message('Todo name')))
    @Expose() @JoiSchema([UPDATE], Joi.string().trim().optional().min(3).max(100).pattern(CHARACTER_NUMBERS_PATTERN.pattern).message(CHARACTER_NUMBERS_PATTERN.message('Todo description')))
    description: string;

    @Expose() @JoiSchema([CREATE], Joi.string().valid('todo', 'in-progress','completed').optional())
    @Expose() @JoiSchema([UPDATE], Joi.string().valid('todo', 'in-progress','completed').required())
    status: string;

}
