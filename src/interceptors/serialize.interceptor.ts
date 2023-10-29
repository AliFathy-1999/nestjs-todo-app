import { UseInterceptors, NestInterceptor,ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/dto/userDto";
export class SerializeInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('Running before handle ', context);
    return next.handle().pipe(
      map(data => {
        console.log("I'm running before response is sent out", data);
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true
        });
      })
    )
  }

}