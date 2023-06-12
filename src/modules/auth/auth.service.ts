import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users, UsersWithoutPassword } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UsersWithoutPassword | null> {
    const user = await this.usersService.findByEmail(email);
    if (user === null) {
      return null;
    }
    const flag = await this.verifyPassword(pass, user.password);
    if (user && user.password == pass) {
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

  async login(user: UsersWithoutPassword) {
    const payload: UsersWithoutPassword = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
