import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * ToDo
 * JwtAuthGuardをJWTであることを指定しているのか？
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
