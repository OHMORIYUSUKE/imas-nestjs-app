import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IdolsService } from './idols.service';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * idolsコントローラ
 *
 * アイドルに関連する情報をルーティングする
 */
@Controller('idols')
export class IdolsController {
  constructor(private readonly idolsService: IdolsService) {}

  /**
   * アイドルの情報を取得し、アイドルを検索する
   *
   * @param name アイドルの名前(部分一致)
   * @returns Promise<IGetIdolInfoArray & { image?: string }>
   */
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async getIdols(
    @Query('name') name: string,
  ): Promise<IGetIdolInfoArray & { image?: string }> {
    const res: IGetIdolInfoArray = await this.idolsService.getIdols(name);
    const resInImage = await Promise.all(
      res.map(async (idol) => {
        const image = await this.idolsService.getIdolsPicture(idol.firstName);
        return {
          ...idol,
          image: image,
        };
      }),
    );
    return resInImage;
  }
}
