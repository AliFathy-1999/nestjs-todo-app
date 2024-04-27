import { IsEmail, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import patterns from 'src/interfaces/patterns';

const { PASSWORD_PATTERN } = patterns
export class SignInDto {

    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(8, { message: 'Invalid userName or Password' })
    @Matches(PASSWORD_PATTERN.pattern, { message: 'Invalid Password' })
    password: string;

}
