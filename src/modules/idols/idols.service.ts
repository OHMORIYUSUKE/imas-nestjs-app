import { Injectable } from '@nestjs/common';
import { PrincessApiSdk } from 'princess-api-sdk';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';

@Injectable()
export class IdolsService {
  /**
   * アイドルの情報を取得し、アイドルを検索する
   * 名前はカタカナ、漢字(部分一致)で検索可能
   *
   * @param name アイドルの名前(部分一致)
   * @param age アイドルの年齢
   * @returns Promise<IGetIdolInfoArray>
   */
  async getIdols(name: string, age: number): Promise<IGetIdolInfoArray> {
    const princessApiSdk = new PrincessApiSdk();
    const response = await princessApiSdk.getIdolInfo();
    if (!name && !age) return response;
    const result = response.filter((idol) => {
      if (idol.age === age) return true;
      if (idol.fullName.indexOf(name) !== -1) return true;
      if (idol.fullNameRuby.indexOf(name) !== -1) return true;
      if (idol.displayName.indexOf(name) !== -1) return true;
      return false;
    });
    return result;
  }
}
