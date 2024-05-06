import { Controller, Get, Post, Body, Patch, Param, Delete, Bind, Res, UsePipes, ValidationPipe, UseFilters, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { todoDto } from './dto/todoDto';

@Controller({
  version: '1',
  path: 'todos',
})

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(ValidationExceptionFilter) 
  @UseGuards(AuthGuard)

  @Bind(Res({ passthrough: true }))
  async create(@Res() response:Response,@Req() req:Request,@Body() createTodoDto: CreateTodoDto) {
    createTodoDto.userId = req['user']._id
    const todo = await this.todoService.create(createTodoDto);
    return todo;
    // try {
      
    //   createTodoDto.userId = req['user']._id
    //   const todo = await this.todoService.create(createTodoDto);
    //   return response.status(201).send({
    //     message: 'Todo created successfully',
    //     data: todo
    //   })
    // } catch (error) {
    //   return response.status(error.status).json({
    //     message: error.message,
    //   }) 
    // }
  }

  @Get()
  @UseGuards(AuthGuard)
  @Serialize(todoDto)
  findAll(@Req() req:Request) {
    const userId = req['user']._id
    return this.todoService.findAll(userId);
  }

  @Get(':id/:userId')
  findOne(@Param('id') id: string,@Param('userId') userId: string) {
    return this.todoService.findOne(id,userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
