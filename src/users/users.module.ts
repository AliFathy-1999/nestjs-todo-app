import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema}  from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
const { jwtConstants } = config 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
    JwtModule.register(jwtConstants),
  ],
  controllers: [UsersController],
  
  providers: [ 
    UsersService,
    UsersRepository,
    AuthService,
  ],
  exports: [
    UsersService,
    UsersRepository,
    AuthService
  ]
})
export class UsersModule {}
