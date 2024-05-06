import { Controller, Get, Post, Body, Patch, Param, Delete, Bind, Res, UsePipes, ValidationPipe, UseFilters, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { todoDto } from './dto/todo.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller({
  version: '1',
  path: 'todos',
})

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Res() res:Response,@Req() req:Request,@Body() createTodoDto: todoDto) {
    
    const todo = await this.todoService.create(req.user.userId,createTodoDto);
    res.json({
      message: 'Todo created successfully',
      data : todo
    })
    return todo;
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)

  async findAll(@Req() req:Request,@Res() res:Response) {
    const userId = req.user.userId
    const userTodos = await this.todoService.findAll(userId);
    res.json({
      message: 'Todos got successfully',
      data : userTodos
    })
    return userTodos
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string, @Req() req:Request,@Res() res:Response) {
    const userId = req.user.userId
    const todo = await this.todoService.findOne(id,userId);
    res.json({
      message: 'Todo got successfully',
      data : todo
    })
    return todo
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTodoDto: todoDto, @Req() req:Request,@Res() res:Response) {
    const userId = req.user.userId;
    const updatedTodo = await this.todoService.update(id, userId ,updateTodoDto);
    res.json({
      message: 'Todo updated successfully',
      data : updatedTodo
    })
    return updatedTodo;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @Req() req:Request,@Res() res:Response) {
    const userId = req.user.userId
    const deletedTodo = await this.todoService.remove(id,userId)
    res.json({
      message: `Todo with Id ${id} deleted successfully`,
    })
    return deletedTodo;  }
}
