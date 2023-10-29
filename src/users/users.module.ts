import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema  from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'src/config';
const { jwt } = config 
console.log(jwt.secret);

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
    JwtModule.register({ 
      secret: jwt.secret,
      signOptions: { expiresIn: '3d' },

    }),
  ],
  controllers: [UsersController],
  providers: [ 
    UsersService,
    UsersRepository,
    AuthService,
  ],
})
export class UsersModule {}
