import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as winston from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: winston.Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() =>
        this.logger.info({
          message: `${req.method} ${req.url} ${Date.now() - now}ms`,
          level: 'info',
        }),
      ),
    );
  }
}
