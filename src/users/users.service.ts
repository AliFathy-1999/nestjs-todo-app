import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersRepository.create(createUserDto);
  }
  async findAll() {
    return await this.usersRepository.findAll();
  }
  
  async findOne(id: string): Promise<CreateUserDto> {
    const user = await this.usersRepository.findOne(id);    
    // if(!user) throw new NotFoundException('User not found')
    
    return user
  }
  async find(email:string): Promise<CreateUserDto> {
      return await this.usersRepository.find(email);
  }

  async update(id: string, updateCatDto: UpdateUserDto): Promise<UpdateUserDto> {
    return this.usersRepository.update(id, updateCatDto);
  }

  async remove(id: string): Promise<CreateUserDto> {
    return this.usersRepository.remove(id);
  }
}
