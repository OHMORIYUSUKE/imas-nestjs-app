import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{
    userId: number;
    username: string;
  } | null> {
    const user = await this.usersService.findOne(username);
    if (user === null) {
      return null;
    }
    const flag = await this.verifyPassword(pass, user.password);
    if (flag) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // パスワードをハッシュ化して比較
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }

  async login(user: { username: string; userId: string }) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
