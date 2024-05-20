import { 
  Controller,
  Get, Post, Patch, Delete,
  Body, Param,
  UsePipes,
  Res,
  HttpStatus, HttpCode,
  UseGuards,
  Req
} from '@nestjs/common';

import { UsersService } from './users.service';
import { userDto } from './dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/userDto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Request, Response } from 'express';
import { SignInDto } from './dto/signIn.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { RolesGuard } from 'src/guards/role.guard';
import { Role } from 'src/interfaces/user.interface';
import { Roles } from 'src/decorators/roles';
@Controller({
  version: '1',
  path: 'users',
})

export class UsersController {
  constructor(private readonly usersService: UsersService,private authService:AuthService) {
  }
  
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: userDto ) {
      const createdUser = this.authService.signUp(userDto)      
      return createdUser
  }
  
  @Post('/signin')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async singIn(@Body() reqBody: SignInDto, @Res() res: Response) {
    const { email, password } = reqBody
      const userData = await this.authService.signIn(email,password);
      res.json(userData)    
      return userData
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    res.json({
      message: 'Users got successfully',
      data : users
    })
    return users;
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Patch('/')
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateUserDto: userDto,@Req() req: Request, @Res() res: Response) {
    const updatedUser = await this.usersService.update(req.user.userId, updateUserDto)
    res.json({
      message: 'User updated successfully',
      data : updatedUser
    })
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
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
