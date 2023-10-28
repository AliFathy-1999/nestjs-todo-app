import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { IUser, Role } from '../../interfaces/user.interface';
import { IsEnum  } from 'class-validator';

export type UserDocument = HydratedDocument<IUser>;

@Schema({ timestamps: true, collection: 'User' })
export class User {

    @Prop({required: true, trim: true })

    firstName: string;

    @Prop({ required: true, trim: true})
    lastName: string;

    @Prop(raw({
        firstName: { type: String },
        lastName: { type: String }
    }))
    details: Record<string, any>;
    
    @Prop({required: true, unique: true})
    email: string;

    //@iti43OS
    @Prop({required: true})
    password: string;

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

export const UserSchema = SchemaFactory.createForClass(User);