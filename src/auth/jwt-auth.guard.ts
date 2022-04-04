import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

/**
 * @UseGuards(AuthGuard('jwt')) // 가드 장착(로컬) 에 인해
 * 이부분이 먼저 실행되고
 */
