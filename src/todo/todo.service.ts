import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todosRepository: TodosRepository) {}
  async create(createTodoDto: CreateTodoDto) {
    const { userId,name } = createTodoDto
    const todoExisted = await this.todosRepository.findOne({ userId, name });
    if(todoExisted) throw new ConflictException('Todo already existed');
    const createdTodo = await this.todosRepository.create(createTodoDto);
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

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
