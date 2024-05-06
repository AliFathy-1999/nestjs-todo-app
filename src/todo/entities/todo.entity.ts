import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';
import { nanoid } from 'nanoid';
import { ITodo } from 'src/interfaces/todo.interface';
import { User } from 'src/users/entities/user.entity';
export type TodoDocument = HydratedDocument<ITodo>;


@Schema({ timestamps: true, collection: 'Todo' })

export class Todo {

    @Prop({ type: String, default:  nanoid()})
    _id: string  

    @Prop({ required: true, ref: 'User', type: String })
    userId: User;

    @Prop({required: true, trim: true})
    title: string;


    @Prop({ default: function() { return `${this.name}'s description`;}, trim: true })
    description: string;


    @Prop({ type : String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' })
    status: boolean;
}

const TodoSchema = SchemaFactory.createForClass(Todo);


export default TodoSchema