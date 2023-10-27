import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  // If you want to configure CORS:
  // app.enableCors({
  //   origin: 'http://your-frontend-url.com'
  // });

  await app.listen(3080);
}
bootstrap();