import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import validationPatterns from "src/interfaces/patterns";
import { Types } from 'mongoose';

const { CHARACTER_NUMBERS_PATTERN } = validationPatterns
export class CreateTodoDto{
    // @IsNotEmpty()
    userId:Types.ObjectId

    @IsString()
    @MinLength(3, { message: 'Minimum length for Todo name is 3'})
    @MaxLength(100, { message: 'Maxmium length for Todo name is 100'})
    @Matches(CHARACTER_NUMBERS_PATTERN.pattern, { message: CHARACTER_NUMBERS_PATTERN.message('Todo name')})
    name: string;

    @IsString()
    @MinLength(3, { message: 'Minimum length for Description is 3'})
    @MaxLength(200, { message: 'Maxmium length for Description is 30'})
    @Matches(CHARACTER_NUMBERS_PATTERN.pattern, { message: CHARACTER_NUMBERS_PATTERN.message('Todo description')})
    description: string;

    @IsOptional()
    isDone: boolean;

}
