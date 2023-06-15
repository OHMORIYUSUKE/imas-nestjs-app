import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { ConflictFilter } from './errors/ConflictException';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // クエリパラメータを自動で型変換する
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // errors
  app.useGlobalFilters(new ConflictFilter());
  // cors
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  /**
   * Helmet
   * Helmetは、HTTPヘッダーを適切に設定する事で、よく知られたウェブの脆弱性からアプリケーションを保護してくれる.
   * 一般的に言うと、Helmetはセキュリティ関連のHTTPヘッダを設定する14個の小さなミドルウェア関数が構成される.
   */
  await app.register(helmet);
  // csrf対策
  await app.register(fastifyCsrf);
  // エンドポイントに/api/...のようにする
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
// 起動
bootstrap();
