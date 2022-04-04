import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as session from 'express-session';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 3000;
  // console.log(path.join(__dirname, '..', 'views'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views')); // 루트에서 바로
  app.useStaticAssets(path.join(__dirname, '..', 'public')); // 루트에서 바로
  app.setViewEngine('ejs');

  // 전역 필터 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  // session 설정
  app.use(
    session({
      secret: 'secretKey', // 서명
      resave: false,
      saveUninitialized: false,
    }),
  );
  const logger = new Logger('Server Start');
  logger.log(`http://localhost:${port} 에서 서버실행`);
  await app.listen(port);
}
bootstrap();
