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
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersWithoutPassword } from '../users/users.entity';
import { FavoriteIdols } from './idols.entity';

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
  ): Promise<IGetIdolInfoArray & { image?: string }> {
    await this.idolsService.addFavoriteIdol(
      req.user.id,
      favoriteIdolDto.idolId,
    );
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorite')
  async getFavoriteIdol(
    @Request() req: { user: UsersWithoutPassword },
  ): Promise<IGetIdolInfoArray & { image?: string; favorite?: boolean }> {
    const res = await this.idolsService.getFavoriteIdolsByUserId(req.user.id);
    const result = await Promise.all(
      res.map(async (favoriteIdol) => {
        const idol = await this.idolsService.getIdolsById(favoriteIdol.idolId);
        const image = await this.idolsService.getIdolsPicture(idol.firstName);
        return {
          ...idol,
          favorite: true,
          image: image,
        };
      }),
    );
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorite/:id')
  async removeFavoriteIdol(
    @Request() req: { user: UsersWithoutPassword },
    @Param('id') id: number,
  ): Promise<FavoriteIdols[]> {
    await this.idolsService.removeFavoriteIdol(req.user.id, id);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async getIdols(
    @Request() req: { user: UsersWithoutPassword },
    @Query('name') name: string,
  ): Promise<IGetIdolInfoArray & { image?: string; favorite?: boolean }> {
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
          image: image,
        };
      }),
    );
    return resInImage;
  }
}
