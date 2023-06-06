import { Controller, Get, Query } from '@nestjs/common';
import { IdolsService } from './idols.service';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';

@Controller()
export class IdolsController {
  constructor(private readonly idolsService: IdolsService) {}

  @Get('idols')
  async getIdols(
    @Query('name') name: string,
    @Query('age') age: number,
  ): Promise<IGetIdolInfoArray> {
    return this.idolsService.getIdols(name, age);
  }
}
