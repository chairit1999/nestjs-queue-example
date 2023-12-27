import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setBullBoard } from './setup-bullboard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setOpenApiSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  setOpenApiSwagger(app);
  setBullBoard(app);
  await app.listen(3000);
}
bootstrap();
