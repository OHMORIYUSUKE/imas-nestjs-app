import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './middleware/cors.middleware';
import { IdolsModule } from './modules/idols/idols.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { AuthService } from './modules/auth/auth.service';
import { ConfigModule } from '@nestjs/config';

/**
 * ルートモジュール
 */
@Module({
  // モジュールを読むこむ
  imports: [
    IdolsModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
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
