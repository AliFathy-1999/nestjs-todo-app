import { ClassSerializerInterceptor, ConflictException, Injectable, UseInterceptors } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<userDto>) {}

    async create(userDto: userDto): Promise<userDto> {
        const createdUser = this.userModel.create(userDto);
        if (!createdUser) {
            throw new ConflictException('User already exists');
        }
        return createdUser;
    }
    async findAll(): Promise<userDto[]> {
        return this.userModel.find();
    }

    async findOne(id: string): Promise<userDto> {        
        return this.userModel.findOne({_id:id});
    }
    async find(email:string): Promise<any> {        
        return this.userModel.find({ email });
    }

    async update(id: string, updateCatDto: userDto): Promise<userDto> {
        return this.userModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
    }

    async remove(id: string): Promise<userDto> {
        return this.userModel.findByIdAndRemove(id).exec();
    }
}
