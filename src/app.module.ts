import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';


@Module({
  imports: [
    UsersModule,
    TodoModule,
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL, { dbName : 'todo-nest'}),
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          console.log('**************before**************');
          schema.pre('save', async function () {
          console.log('**************after pre**************');

            if (this.isModified('password')) {
          console.log('**************after is modified**************');
          this.password = await bcrypt.hash(this.password, 10);

              
            }
          } )
        return schema

        } 
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
