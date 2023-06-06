import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * エントリーポイント
 */
async function bootstrap() {
  // ルートモジュールを登録
  const app = await NestFactory.create(AppModule);
  // クエリパラメータを自動で型変換する
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // エンドポイントに/api/...のようにする
  app.setGlobalPrefix('api');
  // ポート3000でリクエストを待機
  await app.listen(3000);
}
// 起動
bootstrap();
