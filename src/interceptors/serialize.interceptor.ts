import { UseInterceptors, NestInterceptor,ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import classConstructor from "src/interfaces/class-constructor";

export function Serialize(dto: classConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor{
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // console.log('Running before handle ', context);
    return next.handle().pipe(
      map(data => {
        // console.log("I'm running before response is sent out", data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        });
      })
    )
  }

}