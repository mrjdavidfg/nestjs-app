import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(FooMiddleware)
  // app.useGlobalGuards(new FooGuard());
  // app.useGlobalFilters(new FooExceptionFilter());
  // app.useGlobalInterceptors(new FooInterceptor());
  await app.listen(3000);
}

bootstrap();
