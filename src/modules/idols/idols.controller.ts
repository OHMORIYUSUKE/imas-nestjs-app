import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IdolsService } from './idols.service';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * idolsコントローラ
 *
 * アイドルに関連する情報をルーティングする
 */
@Controller()
export class IdolsController {
  constructor(private readonly idolsService: IdolsService) {}

  /**
   * アイドルの情報を取得し、アイドルを検索する
   *
   * @param name アイドルの名前(部分一致)
   * @returns Promise<IGetIdolInfoArray>
   */
  @UseGuards(JwtAuthGuard)
  @Get('idols')
  async getIdols(@Query('name') name: string): Promise<IGetIdolInfoArray> {
    return this.idolsService.getIdols(name);
  }
}
