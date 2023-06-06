import { Module } from '@nestjs/common';
import { IdolsController } from './idols.controller';
import { IdolsService } from './idols.service';

/**
 * IdolsModuleモジュール
 *
 * アイドルに関連するモジュール
 */
@Module({
  imports: [],
  controllers: [IdolsController],
  providers: [IdolsService],
})
export class IdolsModule {}
