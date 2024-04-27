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
        const entitySerializer = plainToClass(this.dto, data.data, {
          excludeExtraneousValues: true,
        });
        data.data = entitySerializer
        return data
        
      })
    )
  }

}