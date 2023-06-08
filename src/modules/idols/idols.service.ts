import { Inject, Injectable } from '@nestjs/common';
import { PrincessApiSdk } from 'princess-api-sdk';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';
import { Like, Repository } from 'typeorm';
import { Idols } from './idols.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdolsService {
  constructor(
    @InjectRepository(Idols) private idolsRepository: Repository<Idols>,
  ) {}
  /**
   * アイドルの情報を取得し、アイドルを検索する
   * 名前はカタカナ、漢字(部分一致)で検索可能
   *
   * @param name アイドルの名前(部分一致)
   * @returns Promise<IGetIdolInfoArray>
   */
  async getIdols(name: string): Promise<IGetIdolInfoArray> {
    const princessApiSdk = new PrincessApiSdk();
    const response = await princessApiSdk.getIdolInfo();
    if (!name) return response;
    const result = response.filter((idol) => {
      if (idol.fullName.indexOf(name) !== -1) return true;
      if (idol.fullNameRuby.indexOf(name) !== -1) return true;
      if (idol.displayName.indexOf(name) !== -1) return true;
      return false;
    });
    return result;
  }

  /**
   * アイドルの情報を取得し、アイドルの画像Urlを検索する
   * めい(部分一致)で検索可能
   *
   * @param name アイドルの名前(めい)(部分一致)
   * @returns 画像のリンク
   */
  async getIdolsPicture(name: string): Promise<string | void> {
    if (name === null) return;
    const idol = await this.idolsRepository.findOne({
      where: {
        name: Like(`%${name}%`),
      },
    });
    if (idol === null) return;
    return idol.image;
  }
}
