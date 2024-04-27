import { 
  Controller,
  Get, Post, Patch, Delete,
  Body, Param,
  UsePipes, ValidationPipe,
  Res,
  HttpStatus, HttpCode,
  UseGuards,
  Req
} from '@nestjs/common';
// import { AuthGuard } from '../guards/auth.guard';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/userDto';
// import { AuthService } from './auth.service';
import { ObjectId } from 'mongoose';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';
import { SignInDto } from './dto/signIn.dto';
@Controller({
  version: '1',
  path: 'users',
})

export class UsersController {
  constructor(private readonly usersService: UsersService,private authService:AuthService) {
  }
  
  @Post('/signup')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  
  async create(@Body() createUserDto: CreateUserDto ) {
      const createdUser = this.authService.signUp(createUserDto)      
      return createdUser
  }
  
  @Post('/signin')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Serialize(UserDto)
  async singIn(@Body() reqBody: SignInDto ) {
    const { email, password } = reqBody
      const userData = await this.authService.signIn(email,password)    
      return userData
  }
  @Get()
  @Serialize(UserDto)
  @HttpCode(HttpStatus.OK)
  findAll(@Res({ passthrough: true }) res: Response) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Serialize(UserDto)
  async findOne(@Param('id') id: any) {
    let user = this.usersService.findOne(id)    
    return user
  }

  @Patch(':id')
  @Serialize(UserDto)
  @UsePipes(ValidationPipe)
  // @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @UseGuards(AuthGuard)
  @Get('/auth/profile')
  getProfile(@Req() req:Request) {    
    return req.user;
  }
}
