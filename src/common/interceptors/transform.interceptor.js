import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor {
  intercept(context, next) {
    console.log('TransformInterceptor');
    return next.handle().pipe(map(data => ({ data })));
  }
}
