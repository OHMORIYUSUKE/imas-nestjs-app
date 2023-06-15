import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';

/**
 * ユーザーに関するモジュール
 */
@Module({
  providers: [UsersService, Repository],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
