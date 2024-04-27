import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import TodoSchema, { Todo } from './entities/todo.entity';
import { TodosRepository } from './todo.repository';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/users/auth.service';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema }
    ]),
    UsersModule
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodosRepository,
  ],
})
export class TodoModule {}
