import { Types } from 'mongoose';
import { Expose } from "class-transformer";

export class todoDto{
    @Expose()
    userId:Types.ObjectId
    @Expose()
    name: string;
    @Expose()
    description: string;
    @Expose()
    isDone: boolean;

}
