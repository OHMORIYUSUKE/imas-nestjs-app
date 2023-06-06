import { Controller, Get, Query } from '@nestjs/common';
import { IdolsService } from './idols.service';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';

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
   * @param age アイドルの年齢
   * @returns Promise<IGetIdolInfoArray>
   */
  @Get('idols')
  async getIdols(
    @Query('name') name: string,
    @Query('age') age: number,
  ): Promise<IGetIdolInfoArray> {
    return this.idolsService.getIdols(name, age);
  }
}
