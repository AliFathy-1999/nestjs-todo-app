import { ClassSerializerInterceptor, ConflictException, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Todo } from './entities/todo.entity';
import { ITodo } from 'src/interfaces/todo.interface';

@Injectable()
export class TodosRepository {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<CreateTodoDto>) {}

    async create(CreateTodoDto: CreateTodoDto): Promise<CreateTodoDto> {
        return this.todoModel.create(CreateTodoDto);
    }
    async findAll(filterBy: {[key:string]:any}): Promise<CreateTodoDto[]> {
        return this.todoModel.find(filterBy);
    }

    async findOne(filterBy: {[key:string]:any}): Promise<CreateTodoDto> {   
        console.log('------------------------------');
            
        return this.todoModel.findOne(filterBy);
    }
    async find(email:string): Promise<any> {        
        return this.todoModel.find({ email });
    }

    async update(id: string, updateCatDto: UpdateTodoDto): Promise<UpdateTodoDto> {
        return this.todoModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
    }

    async remove(id: string): Promise<CreateTodoDto> {
        return this.todoModel.findByIdAndRemove(id).exec();
    }
}
