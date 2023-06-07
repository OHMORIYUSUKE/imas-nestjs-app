import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';
import * as helmet from 'helmet';

/**
 * エントリーポイント
 */
async function bootstrap() {
  // ルートモジュールを登録
  const app = await NestFactory.create(AppModule);
  // クエリパラメータを自動で型変換する
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // csrf対策
  app.use(csurf());
  /**
   * Helmet
   * Helmetは、HTTPヘッダーを適切に設定する事で、よく知られたウェブの脆弱性からアプリケーションを保護してくれる.
   * 一般的に言うと、Helmetはセキュリティ関連のHTTPヘッダを設定する14個の小さなミドルウェア関数が構成される.
   */
  app.use(helmet);
  // エンドポイントに/api/...のようにする
  app.setGlobalPrefix('api');
  // ポート3000でリクエストを待機
  await app.listen(3000);
}
// 起動
bootstrap();
