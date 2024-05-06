import { Injectable } from '@nestjs/common';
import { todoDto } from './dto/todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosRepository {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<todoDto>) {}

    async create(todoDto: {[key:string]:any}): Promise<todoDto> {
        return this.todoModel.create(todoDto);
    }
    async findAll(filterBy: {[key:string]:any}): Promise<todoDto[]> {
        return this.todoModel.find(filterBy);
    }

    async findOne(filterBy: {[key:string]:any}): Promise<todoDto> {   
        return this.todoModel.findOne(filterBy);
    }
    async find(email:string): Promise<any> {        
        return this.todoModel.find({ email });
    }

    async update(id: string, userId:string,updateCatDto: todoDto): Promise<todoDto> {
        return this.todoModel.findOneAndUpdate({_id: id, userId }, updateCatDto, { new: true }).exec();
    }

    async remove(id: string, userId:string): Promise<todoDto> {
        return this.todoModel.findOneAndRemove({_id: id, userId }).exec();
    }
}
