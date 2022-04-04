import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

/**
 * @UseGuards(AuthGuard('local')) // 가드 장착(로컬) 에 인해
 * 이부분이 먼저 실행되고
 * 이후에 local.strategy.ts 가 실해오딘다
 */
