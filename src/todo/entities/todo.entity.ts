import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';
import { ITodo } from 'src/interfaces/todo.interface';
import { User } from 'src/users/entities/user.entity';
export type TodoDocument = HydratedDocument<ITodo>;


@Schema({ timestamps: true, collection: 'Todo' })

export class Todo {

    @Prop({ required: true, ref: 'User', type: Types.ObjectId })
    userId: User;

    @Prop({required: true, trim: true, unique: true})
    name: string;


    @Prop({ default: function() { return `${this.name}'s description`;}, trim: true })
    description: string;


    @Prop({ default : false })
    isDone: boolean;
}

const TodoSchema = SchemaFactory.createForClass(Todo);


export default TodoSchema