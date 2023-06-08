import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdolsModule } from './modules/idols/idols.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Idole } from './modules/idols/idols.entity';
import { join } from 'path';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // TypeOrmModuleの設定オブジェクトを作成する
        const ormConfig: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('MYSQL_USER'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
          synchronize: true,
        };
        return ormConfig;
      },
      inject: [ConfigService],
    }),
  ],
  // コントローラを登録する
  controllers: [AppController],
  // プロバイダ(サービス)を登録する
  providers: [AppService],
})
export class AppModule {}
