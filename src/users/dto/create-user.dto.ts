import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsEnum, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import patterns from "src/interfaces/patterns";
import { Role } from "src/interfaces/user.interface";

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'Minimum length for First Name is 3'})
    @MaxLength(30, { message: 'Maxmium length for First Name is 30'})
    @Matches(patterns.CHARACTERS_ONLY, { message: 'First name must be characters only'})
    firstName: string;

    @IsString()
    @MinLength(3, { message: 'Minimum length for Last Name is 3'})
    @MaxLength(30, { message: 'Maxmium length for Last Name is 30'})
    @Matches(patterns.CHARACTERS_ONLY, { message: 'Last name must be characters only'})
    lastName: string;

    @IsEmail({}, { message : 'Invalid email format'})
    email: string;

    @Matches(patterns.PASSWORD_PATTERN, { message: 'Password must contain at least one number , Capital letter and one special character'})
    @IsString()
    @MinLength(8)
    @Exclude()
    password: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    userName: string;

    @IsPhoneNumber('EG')
    phoneNumber : string;

    verified: boolean;
    
    role: Role;
}
