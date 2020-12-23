import { Module, RequestMethod } from '@nestjs/common';
import { logger } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer) {
    consumer
      .apply(logger)
      .forRoutes({ path: 'cats/*', method: RequestMethod.GET });
  }
}
