import { ObjectId } from "mongoose";

enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

interface  IUser extends Document{
    _id:ObjectId
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
    role: Role;
}

export { Role, IUser } 