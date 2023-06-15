import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuardを使って認証時みユーザーのリクエストのみ受け付ける
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
