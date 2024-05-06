import { JoiSchemaOptions } from "nestjs-joi";
import { JoiSchema } from "joi-class-decorators";
import * as Joi from "joi";
import { Expose } from "class-transformer";
import validationPatterns from "src/interfaces/patterns";

@JoiSchemaOptions({
    allowUnknown: false,
})
export class CreateUserDto {
    @Expose() @JoiSchema(Joi.string().trim().required().min(3).max(30).pattern(validationPatterns.CHARACTERS_ONLY.pattern))
    firstName: string;

    @Expose() @JoiSchema(Joi.string().trim().required().min(3).max(30).pattern(validationPatterns.CHARACTERS_ONLY.pattern))
    lastName: string;

    @Expose() @JoiSchema(Joi.string().email().message('Invalid Email').required())
    email: string;

    @Expose() @JoiSchema(Joi.string().trim().pattern(validationPatterns.PASSWORD_PATTERN.pattern).message('Password must contain at least one uppercase letter, one number and one special character').required() )
    password: string;

    @Expose() @JoiSchema(Joi.string().trim().required().min(3).max(30))
    userName: string;

    @Expose() @JoiSchema(Joi.string().trim().required().length(11).pattern(validationPatterns.EGYPTIAN_PHONE_NO_PATTERN.pattern).message(validationPatterns.EGYPTIAN_PHONE_NO_PATTERN.message))
    phoneNumber : string;

}
