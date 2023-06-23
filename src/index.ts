import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FastifyServerOptions, FastifyInstance, fastify } from 'fastify';
import * as awsLambdaFastify from 'aws-lambda-fastify';
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from '@fastify/helmet';
import { ConflictFilter } from './errors/ConflictException';
import fastifyCsrf from '@fastify/csrf-protection';

interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

let cachedNestApp: NestApp;

async function bootstrapServer(): Promise<NestApp> {
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
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
  await app.init();
  return { app, instance };
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!cachedNestApp) {
    cachedNestApp = await bootstrapServer();
  }
  const proxy = awsLambdaFastify(cachedNestApp.instance);
  return proxy(event, context);
};
