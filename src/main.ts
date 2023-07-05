import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionHandler } from './common/exception/exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }));
  app.useGlobalFilters(new GlobalExceptionHandler());
  
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
