import { BadRequestException, Injectable } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';
const {
  hash : { saltRounds }
} = config

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService, private jwtService: JwtService) {}

    async signUp(userDto : userDto){
        const hashPassword = await bcrypt.hash(userDto.password, saltRounds);
        userDto.password = hashPassword
        return this.usersService.create(userDto);
    }
    async signIn(email:string, password:string){
      const [ user ] = await this.usersService.find(email) as any;     
      
      if(!user) throw new BadRequestException('Invalid Email');
      const userPassword = await bcrypt.compare(password, user.password);
      
      if(!userPassword) throw new BadRequestException('Invalid Password');
      const payload = { userId: user._id, email: user.email, role: user.role };
      const token = await this.jwtService.signAsync(payload);
      const userData = {
        data:user,
        token,
      };
      
      return userData;

  }
}
