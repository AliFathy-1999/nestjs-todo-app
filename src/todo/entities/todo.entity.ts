import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';
import { ITodo } from 'src/interfaces/todo.interface';
import { User } from 'src/users/entities/user.entity';
import * as moment from 'moment'; 
export type TodoDocument = HydratedDocument<ITodo>;


@Schema({ timestamps: true, collection: 'Todo' })

export class Todo {

    @Prop({ required: true, ref: 'User', type: String })
    userId: User;

    @Prop({required: true, trim: true})
    title: string;


    @Prop({ default: function() { return `${this.name}'s description`;}, trim: true })
    description: string;


    @Prop({ type : String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' })
    status: string;

}

const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.methods.toJSON = function () {
    const todo = this;
    const todoObject = todo.toObject();
    delete todoObject.__v;
    return todoObject;
  };

export default TodoSchema