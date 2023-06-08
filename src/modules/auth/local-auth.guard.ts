import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * ToDo
 * login の時につける
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
