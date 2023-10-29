import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { IUser, Role } from '../../interfaces/user.interface';
import { IsEnum  } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
export type UserDocument = HydratedDocument<IUser>;


@Schema({ timestamps: true, collection: 'User' })
@Exclude()

export class User {

    @Prop({required: true, trim: true })

    firstName: string;

    @Prop({ required: true, trim: true})
    lastName: string;

    
    @Prop({required: true, unique: true})
    email: string;

    //@iti43OS
    @Prop({required: true})
    @Exclude()
    password: string;

    constructor(partial: Partial<CreateTodoDto>) {
        Object.assign(this, partial);
      }

    @Prop({required: true, unique: true, trim: true})
    userName: string;

    @Prop({required:true })
    phoneNumber: string;

    @Prop({default : Role.USER})
    
    @IsEnum([Object.keys(Role)])
    role: Role;

    @Prop({default:false})
    verified: boolean;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

export default UserSchema