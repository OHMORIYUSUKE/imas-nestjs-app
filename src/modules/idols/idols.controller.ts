import {
  Controller,
  Get,
  Query,
  UseGuards,
  Post,
  Request,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { IdolsService } from './idols.service';
import {
  IGetIdolInfo,
  IGetIdolInfoArray,
} from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersWithoutPassword } from '../users/users.entity';

type FavoriteIdolDto = {
  idolId: number;
};
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
  @Post('favorite')
  async postFavoriteIdol(
    @Request() req: { user: UsersWithoutPassword },
    @Body() favoriteIdolDto: FavoriteIdolDto,
  ): Promise<void> {
    await this.idolsService.addFavoriteIdol(
      req.user.id,
      favoriteIdolDto.idolId,
    );
    return;
  }

  /**
   * いいねしたアイドル情報を取得
   *
   * @param req 認証情報
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('favorite')
  async getFavoriteIdol(
    @Request() req: { user: UsersWithoutPassword },
  ): Promise<(IGetIdolInfo & { image?: string; favorite: boolean })[]> {
    const res = await this.idolsService.getFavoriteIdolsByUserId(req.user.id);
    const result = await Promise.all(
      res.map(async (favoriteIdol) => {
        const idol = await this.idolsService.getIdolsById(favoriteIdol.idolId);
        const image = await this.idolsService.getIdolsPicture(idol.firstName);
        return {
          ...idol,
          favorite: true,
          image: image ? image : undefined,
        };
      }),
    );
    return result;
  }

  /**
   * 特定のアイドルのいいねを取り消す
   *
   * @param req 認証情報
   * @param id いいねを取り消すアイドルのid
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Delete('favorite/:id')
  async removeFavoriteIdol(
    @Request() req: { user: UsersWithoutPassword },
    @Param('id') id: number,
  ): Promise<void> {
    await this.idolsService.removeFavoriteIdol(req.user.id, id);
    return;
  }

  /**
   * アイドルの情報を取得し、アイドルを検索する
   * 名前はカタカナ、漢字(部分一致)で検索可能
   *
   * ユーザーがいいねしたアイドルかの情報も取得できる
   *
   * @param req 認証情報
   * @param name アイドルの名前(部分一致)
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async getIdols(
    @Request() req: { user: UsersWithoutPassword },
    @Query('name') name: string,
  ): Promise<(IGetIdolInfo & { image?: string; favorite: boolean })[]> {
    const res: IGetIdolInfoArray = await this.idolsService.getIdolsByName(name);
    const resInImage = await Promise.all(
      res.map(async (idol) => {
        const image = await this.idolsService.getIdolsPicture(idol.firstName);
        const isFavorite = await this.idolsService.isAlreadyFavorite(
          req.user.id,
          idol.id,
        );
        return {
          ...idol,
          favorite: isFavorite,
          image: image ? image : undefined,
        };
      }),
    );
    return resInImage;
  }
}
