import { Injectable, NotFoundException } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository) {}

  async create(userDto: userDto): Promise<userDto> {
    return this.usersRepository.create(userDto);
  }
  async findAll() {
    return await this.usersRepository.findAll();
  }
  
  async findOne(id: string): Promise<userDto> {
    const user =  this.usersRepository.findOne(id);    
    // if(!user) throw new NotFoundException('User not found')
    
    return user
  }
  async find(email:string): Promise<userDto> {
      return await this.usersRepository.find(email);
  }

  async update(id: string, updateCatDto: userDto): Promise<userDto> {
    return this.usersRepository.update(id, updateCatDto);
  }

  async remove(id: string): Promise<userDto> {
    return this.usersRepository.remove(id);
  }
}
