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
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Request, Response } from 'express';
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
  async singIn(@Body() reqBody: SignInDto, @Res() res: Response) {
    const { email, password } = reqBody
      const userData = await this.authService.signIn(email,password);
      res.json(userData)    
      return userData
  }
  @Get()
  // @Serialize(UserDto)
  // @UseInterceptors(ClassSerializerInterceptor)

  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    res.json({
      message: 'Users got successfully',
      data : users
    })
    return users;
  }

  @Get(':id')
  @Serialize(UserDto)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: any,@Res() res: Response) {
    let user = await this.usersService.findOne(id)    
    res.json({
      message: 'User got successfully',
      data : user
    })
    return user
  }

  @Patch(':id')
  @Serialize(UserDto)
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)

  // @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Res() res: Response) {
    const updatedUser = await this.usersService.update(id, updateUserDto)
    res.json({
      message: 'User updated successfully',
      data : updatedUser
    })
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string,@Res() res: Response) {
    const deletedUser = await this.usersService.remove(id)
    res.json({
      message: 'User Deleted successfully',
    })
    return deletedUser;
  }

  @UseGuards(AuthGuard)
  @Get('/auth/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req:Request, @Res() res:Response) {
    const user = await this.usersService.findOne(req.user.userId)
    res.json({
      data: user
    })
  }
}
