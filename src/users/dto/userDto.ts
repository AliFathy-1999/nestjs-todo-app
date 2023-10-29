import { Expose, Exclude } from "class-transformer";
import { ObjectId } from "mongoose";
import { Role } from "src/interfaces/user.interface";
export class UserDto {
    @Expose()
    _id:ObjectId;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    role:Role;

    @Expose()
    verified: boolean;

    @Expose()
    createdAt: Date;

    

}