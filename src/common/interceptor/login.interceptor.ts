import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// 세션 확인 인터셉터
@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    console.log('세션을 확인합니다');
    console.log(req.session);

    if (!req.session.email) {
      // res.redirect('/');
      console.log('세션이 없습니다');
      req.myFlag = false;
    }

    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`세션을 확인했습니다.`)));
  }
}
