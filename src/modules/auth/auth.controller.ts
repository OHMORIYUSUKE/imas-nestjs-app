import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

/**
 * 認証系
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * ログイン処理
   *
   * @param req any
   * @returns token
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
