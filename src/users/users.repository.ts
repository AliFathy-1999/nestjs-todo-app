import { ClassSerializerInterceptor, ConflictException, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<CreateUserDto>) {}

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const createdUser = this.userModel.create(createUserDto);
        if (!createdUser) {
            throw new ConflictException('User already exists');
        }
        return createdUser;
    }
    async findAll(): Promise<CreateUserDto[]> {
        return this.userModel.find();
    }

    async findOne(id: string): Promise<CreateUserDto> {        
        return this.userModel.findById({_id:id});
    }
    async find(email:string): Promise<any> {        
        return this.userModel.find({ email });
    }

    async update(id: string, updateCatDto: UpdateUserDto): Promise<UpdateUserDto> {
        return this.userModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
    }

    async remove(id: string): Promise<CreateUserDto> {
        return this.userModel.findByIdAndRemove(id).exec();
    }
}
