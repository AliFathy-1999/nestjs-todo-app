import { 
  Controller,
  Get, Post, Patch, Delete,
  Body, Param,
  UsePipes, ValidationPipe,
  Req, Res,
  Version, HttpStatus, HttpCode 
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

const { saltOrRounds } = process.env
@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() request: Request, @Res({ passthrough: true }) res: Response ,
  @Body() createUserDto: CreateUserDto) {
    // console.log(response.json());
    
    const createdUser = this.usersService.create(createUserDto)
    
    // return {
    //   message: 'User created successfully',
    //   data: createdUser
    // };
    // return createdUser

    // res.json({
    //   message: 'User created successfully',
    //   data: createdUser
    // })
    return createdUser
  }

  // @Get()
  // async findAll() {
  //   return this.usersService.findAll();
  // }
  @Get()
  @HttpCode(HttpStatus.OK)
findAll(@Res({ passthrough: true }) res: Response) {
  return this.usersService.findAll();
}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
