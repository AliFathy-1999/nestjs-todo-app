import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema  from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [ 
    UsersService,
    UsersRepository,
  ],
})
export class UsersModule {}
