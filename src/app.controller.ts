import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * ルートコントローラ
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 文字列(Hello World!)を返す
   * @returns string
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
