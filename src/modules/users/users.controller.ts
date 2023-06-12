import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UsersWithoutPassword } from './users.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * ユーザー情報を取得する
   * headerにJWTトークンを付与する
   *
   * @param req any
   * @returns user
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: UsersWithoutPassword }) {
    return req.user;
  }
}
