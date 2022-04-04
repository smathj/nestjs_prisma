import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // 토큰 검증
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log('[jwt 토큰 추출하여 검증하기]');
          console.log(req.session['jwt']);
          return req.session['jwt'];
        },
      ]),
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // 비밀키
    });
  }
  // 검증후
  async validate(payload: any) {
    console.log('[1] jwt payload 확인');
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}
