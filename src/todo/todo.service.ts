import { BadRequestException, Injectable } from '@nestjs/common';
import { TodosRepository } from './todo.repository';
import { todoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todosRepository: TodosRepository) {}
  async create(userId:string,createTodoDto: todoDto) {
    const createdTodo = await this.todosRepository.create({userId,...createTodoDto});
    if(!createdTodo) throw new BadRequestException('Failed to create Todo, please try again');
    return 
  }

  async findAll(userId:string) {
    const allTodos = await this.todosRepository.findAll({userId});
    return {
      data:allTodos
    }
  }

  findOne(todoId:string,userId:string) {
    return this.todosRepository.findOne({_id:todoId,userId});
  }

  update(id: string, userId:string, updateTodoDto: todoDto) {
    return this.todosRepository.update(id,userId,updateTodoDto);
  }

  remove(id: string, userId:string) {
    return this.todosRepository.remove(id,userId);
  }
}
