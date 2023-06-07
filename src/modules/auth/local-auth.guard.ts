import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * ToDo
 * わからない
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
