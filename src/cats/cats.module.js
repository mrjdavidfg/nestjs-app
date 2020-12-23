import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    CatsService,
  ],
})
export class CatsModule {}
