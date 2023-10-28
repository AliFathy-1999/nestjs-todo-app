import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersRepository.create(createUserDto);
  }
  findAll() {
    return this.usersRepository.findAll();
  }
  async findOne(id: string): Promise<CreateUserDto> {
    return this.usersRepository.findOne(id);
  }

  async update(id: string, updateCatDto: UpdateUserDto): Promise<UpdateUserDto> {
    return this.usersRepository.update(id, updateCatDto);
  }

  async remove(id: string): Promise<CreateUserDto> {
    return this.usersRepository.remove(id);
  }
}
