import { Injectable } from '@nestjs/common';
import { PrincessApiSdk } from 'princess-api-sdk';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';
import { idolsPictures, idolsPicturesBaseUrl } from './idolsPictures';

@Injectable()
export class IdolsService {
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
   * 漢字(部分一致)で検索可能
   *
   * @param name アイドルの名前(部分一致)
   * @returns 画像のリンク
   */
  getIdolsPicture(name: string): string | void {
    for (const idol of idolsPictures) {
      if (name.indexOf(idol.name) !== -1) {
        return idolsPicturesBaseUrl + '/' + idol.image + '.jpg';
      }
    }
  }
}
