import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './middleware/cors.middleware';
import { IdolsModule } from './modules/idols/idols.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

/**
 * ルートモジュール
 */
@Module({
  // モジュールを読むこむ
  imports: [
    IdolsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  // コントローラを登録する
  controllers: [AppController],
  // プロバイダ(サービス)を登録する
  providers: [AppService],
})
export class AppModule {}
