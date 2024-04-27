import { Types } from "mongoose";

interface  ITodo extends Document{
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    description: string;
    isDone: boolean;
}

export { ITodo } 