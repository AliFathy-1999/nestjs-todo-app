import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, InferSchemaType, now } from 'mongoose';
import { IUser, Role } from '../../interfaces/user.interface';
import { IsEnum  } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<IUser>;


@Schema({ timestamps: true, collection: 'User' })
@Exclude()

export class User {
    @Prop({ type: String, default:  nanoid()})
    _id: string  
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

    @Prop({required:true, trim: true })
    phoneNumber: string;

    @Prop({default : Role.USER})
    
    @IsEnum([Object.keys(Role)])
    role: Role;

    @Prop({default:false})
    verified: boolean;

}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};
type userType = InferSchemaType<typeof UserSchema>;

export  { UserSchema,userType }