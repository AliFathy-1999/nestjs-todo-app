import { 
  Controller,
  Get, Post, Patch, Delete,
  Body, Param,
  UsePipes, ValidationPipe,
  Req, Res,
  HttpStatus, HttpCode,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/userDto';
import { AuthService } from './auth.service';
@Controller({
  version: '1',
  path: 'users',
})

export class UsersController {
  constructor(private readonly usersService: UsersService, private authService:AuthService) {
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
  async singIn(@Body() reqBody: Record<string, any> ) {
    const { email, password } = reqBody
    console.log(reqBody);
    
      const user = this.authService.signIn(email,password)      
      return user
  }
  @Get()
  @Serialize(UserDto)
  @HttpCode(HttpStatus.OK)
  findAll(@Res({ passthrough: true }) res: Response) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Serialize(UserDto)
  async findOne(@Param('id') id: string) {
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
}
