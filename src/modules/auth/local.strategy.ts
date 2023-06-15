import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersWithoutPassword } from '../users/users.entity';

/**
 * PassportStrategyを継承し独自のバリデーションを行う
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * ユーザーが正しいかのバリデーション
   *
   * @param email メールアドレス
   * @param password 平文のパスワード
   * @returns
   */
  async validate(
    email: string,
    password: string,
  ): Promise<UsersWithoutPassword> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
