import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './middleware/cors.middleware';
import { IdolsModule } from './modules/idols/idols.module';

/**
 * ルートモジュール
 */
@Module({
  // モジュールを読むこむ
  imports: [IdolsModule],
  // コントローラを登録する
  controllers: [AppController],
  // プロバイダ(サービス)を登録する
  providers: [AppService],
})
export class AppModule {
  // ミドルウェアを設定
  configure(consumer: MiddlewareConsumer) {
    // CorsMiddlewareを適用
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
