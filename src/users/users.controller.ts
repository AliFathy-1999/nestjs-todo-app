import { 
  Controller,
  Get, Post, Patch, Delete,
  Body, Param,
  UsePipes, ValidationPipe,
  Req, Res,
  HttpStatus, HttpCode,
  UseInterceptors, ClassSerializerInterceptor 
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller({
  version: '1',
  path: 'users',
})
// @UseInterceptors(ClassSerializerInterceptor)

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  // @UseInterceptors(ClassSerializerInterceptor)
  async create(
      @Req() request: Request, @Res({ passthrough: true }) res: Response ,
      @Body() createUserDto: CreateUserDto
    ) {

      const createdUser = this.usersService.create(createUserDto)
      return createdUser
  }

  @Get()
  // @UseInterceptors(CustomInterceptors)

  @UseInterceptors(SerializeInterceptor)
  
  @HttpCode(HttpStatus.OK)
  findAll(@Res({ passthrough: true }) res: Response) {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let user = this.usersService.findOne(id)    
    return user
  }

  @Patch(':id')
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
