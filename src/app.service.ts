import { Injectable } from '@nestjs/common';
import { PrincessApiSdk } from 'princess-api-sdk';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';

@Injectable()
export class AppService {
  async getIdols(name: string, age: number): Promise<IGetIdolInfoArray> {
    const princessApiSdk = new PrincessApiSdk();
    // id指定なし
    const response = await princessApiSdk.getIdolInfo();
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
