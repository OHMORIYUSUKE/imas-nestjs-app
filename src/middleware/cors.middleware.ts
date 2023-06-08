import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * CORSのリクエストを許可する
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    // 全てのオリジンを許可
    res.header('Access-Control-Allow-Origin', '*');
    // 許可するヘッダーを指定
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  }
}
