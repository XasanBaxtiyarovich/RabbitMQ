import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT, () => {
    console.log('SERVER RUNING ON PORT ' + process.env.PORT);
  });
}
bootstrap();
