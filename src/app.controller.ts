import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IGetIdolInfoArray } from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('idols')
  async getIdols(
    @Query('name') name: string,
    @Query('age') age: number,
  ): Promise<IGetIdolInfoArray> {
    return this.appService.getIdols(name, age);
  }
}
