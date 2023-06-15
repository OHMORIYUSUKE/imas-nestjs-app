import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users, UsersWithoutPassword } from '../users/users.entity';
import { CreateUserDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * ユーザーがDBに存在するかどうか
   * ハッシュ化済みのパスワードと平文のパスワードが一致するか検証
   *
   * @param email メールアドレス
   * @param pass パスワード(ハッシュ化されていない)
   * @returns
   */
  async validateUser(
    email: string,
    pass: string,
  ): Promise<UsersWithoutPassword | null> {
    const user = await this.usersService.findByEmail(email);
    if (user === null) {
      return null;
    }
    const isPasswordMatch = await this.verifyPassword(pass, user.password);
    if (isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * パスワードをハッシュ化する
   *
   * @param password
   * @returns
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  /**
   * パスワードとハッシュ化されているパスワードが一致しているか確認する
   *
   * @param plainPassword
   * @param hashedPassword
   * @returns
   */
  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }

  /**
   * JWTのペイロードを作成しログイン
   * トークンを発行する
   *
   * @param user
   * @returns
   */
  async login(user: UsersWithoutPassword) {
    const payload: UsersWithoutPassword = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * ユーザー作成
   *
   * パスワードをハッシュ化してDBに保存
   *
   * @param createUserDto
   * @returns
   */
  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
