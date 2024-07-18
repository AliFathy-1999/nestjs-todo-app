import { Expose } from "class-transformer";
import { IsEmail, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import patterns from 'src/interfaces/patterns';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";

const { PASSWORD_PATTERN } = patterns
@JoiSchemaOptions({
    allowUnknown: false,
})
export class SignInDto {

    @Expose() @JoiSchema(Joi.string().email().message('Invalid Email').required())
    email: string;

    @Expose() @JoiSchema(Joi.string().trim().pattern(PASSWORD_PATTERN.pattern).message('Password must contain at least one uppercase letter, one number and one special character').required() )
    password: string;

}
