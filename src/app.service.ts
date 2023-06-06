import { Injectable } from '@nestjs/common';
import { PrincessApiSdk } from 'princess-api-sdk';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
