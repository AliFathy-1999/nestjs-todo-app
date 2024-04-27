import { IsEmail, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import patterns from "src/interfaces/patterns";
import { Role } from "src/interfaces/user.interface";
import validationPatterns from "src/interfaces/patterns";

const { PASSWORD_PATTERN,CHARACTERS_ONLY } = validationPatterns
export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'Minimum length for First Name is 3'})
    @MaxLength(30, { message: 'Maxmium length for First Name is 30'})
    @Matches(CHARACTERS_ONLY.pattern, { message: CHARACTERS_ONLY.message('First Name') })
    firstName: string;

    @IsString()
    @MinLength(3, { message: 'Minimum length for Last Name is 3'})
    @MaxLength(30, { message: 'Maxmium length for Last Name is 30'})
    @Matches(CHARACTERS_ONLY.pattern, { message: CHARACTERS_ONLY.message('Last name') })
    lastName: string;

    @IsEmail({}, { message : 'Invalid email format'})
    email: string;

    @Matches(PASSWORD_PATTERN.pattern, { message: PASSWORD_PATTERN.message })
    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    userName: string;

    @IsPhoneNumber('EG', { message: 'Invalid phone number, please enter a valid Egyptain phone number' })
    phoneNumber : string;

    verified: boolean;
    
    role: Role;
}
