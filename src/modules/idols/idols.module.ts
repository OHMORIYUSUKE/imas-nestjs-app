import { Module } from '@nestjs/common';
import { IdolsController } from './idols.controller';
import { IdolsService } from './idols.service';
import { Repository } from 'typeorm';
import { Idols } from './idols.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * IdolsModuleモジュール
 *
 * アイドルに関連するモジュール
 */
@Module({
  imports: [TypeOrmModule.forFeature([Idols])],
  controllers: [IdolsController],
  providers: [IdolsService, Repository],
})
export class IdolsModule {}
