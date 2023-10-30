import { ClassSerializerInterceptor, ConflictException, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UsersRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<CreateUserDto>) {}

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const createdUser = this.userModel.create(createUserDto);
        return createdUser;
    }
    async findAll(): Promise<CreateUserDto[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: ObjectId): Promise<CreateUserDto> {        
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
