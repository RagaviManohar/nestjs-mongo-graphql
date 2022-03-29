import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  // TODO - Implement CORS based on frontend app requirement.
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // For handling validation of input datas
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('BACKEND_PREFIX'));

  await app.listen(configService.get('PORT'));
}
bootstrap();
