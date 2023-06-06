import { Injectable } from '@nestjs/common';

/**
 * ルートサービス
 */
@Injectable()
export class AppService {
  /**
   * 'Hello World!'を返す
   * @returns 'Hello World!'
   */
  getHello(): string {
    return 'Hello World!';
  }
}
