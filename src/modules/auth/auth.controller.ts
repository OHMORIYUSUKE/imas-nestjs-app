import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';
import { UsersWithoutPassword } from '../users/users.entity';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
}

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

  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UsersWithoutPassword> {
    const userWithoutPassword = await this.authService.signUp(createUserDto);
    return userWithoutPassword;
  }
}
