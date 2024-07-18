import { Injectable } from '@nestjs/common';
import { todoDto } from './dto/todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosRepository {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<todoDto>) {}

    async create(todoDto: {[key:string]:any}): Promise<todoDto> {
        return await this.todoModel.create(todoDto);
    }
    async findAll(filterBy: {[key:string]:any}): Promise<todoDto[]> {
        return await this.todoModel.find(filterBy);
    }

    async findOne(filterBy: {[key:string]:any}): Promise<todoDto> {   
        return await this.todoModel.findOne(filterBy);
    }
    async find(email:string): Promise<any> {        
        return await this.todoModel.find({ email });
    }

    async update(id: string, userId:string,updateTodoDto: todoDto): Promise<todoDto> {
        return await this.todoModel.findOneAndUpdate({_id: id, userId }, updateTodoDto, { new: true });
    }

    async remove(id: string, userId:string): Promise<todoDto> {
        return await this.todoModel.findOneAndRemove({_id: id, userId }).exec();
    }
}
