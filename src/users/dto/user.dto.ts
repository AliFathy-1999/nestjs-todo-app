import { CREATE, JoiSchemaOptions, UPDATE } from "nestjs-joi";
import { JoiSchema } from "joi-class-decorators";
import * as Joi from "joi";
import { Expose } from "class-transformer";
import validationPatterns from "src/interfaces/patterns";

@JoiSchemaOptions({
    allowUnknown: true,
})
export class userDto {
    @Expose() @JoiSchema([CREATE], Joi.string().trim().required().min(3).max(30).pattern(validationPatterns.CHARACTERS_ONLY.pattern))
    @Expose() @JoiSchema([UPDATE], Joi.string().trim().optional().min(3).max(30).pattern(validationPatterns.CHARACTERS_ONLY.pattern))
    firstName: string;

    @Expose() @JoiSchema([CREATE], Joi.string().trim().required().min(3).max(30).pattern(validationPatterns.CHARACTERS_ONLY.pattern))
    @Expose() @JoiSchema([UPDATE], Joi.string().trim().optional().min(3).max(30).pattern(validationPatterns.CHARACTERS_ONLY.pattern))
    lastName: string;

    @Expose() @JoiSchema([CREATE], Joi.string().email().message('Invalid Email').required())
    @JoiSchema([UPDATE], Joi.forbidden())
    email: string;

    @Expose() @JoiSchema([CREATE], Joi.string().trim().pattern(validationPatterns.PASSWORD_PATTERN.pattern).message('Password must contain at least one uppercase letter, one number and one special character').required() )
    @JoiSchema([UPDATE], Joi.forbidden())
    password: string;

    @Expose() @JoiSchema([CREATE], Joi.string().trim().required().min(3).max(30))
    @JoiSchema([UPDATE], Joi.forbidden())
    userName: string;

    @Expose() @JoiSchema([CREATE], Joi.string().trim().required().length(11).pattern(validationPatterns.EGYPTIAN_PHONE_NO_PATTERN.pattern).message(validationPatterns.EGYPTIAN_PHONE_NO_PATTERN.message))
    @JoiSchema([UPDATE], Joi.forbidden())
    phoneNumber : string;

}
