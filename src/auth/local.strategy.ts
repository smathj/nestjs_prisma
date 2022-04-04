import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

// Pass Port 로컬 전략
@Injectable()
// new LocalStrategy(...) 이부분
export class LocalStrategy extends PassportStrategy(Strategy) {
  // authService 의존성 주입
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' }); // 시키는대로
  }

  /**
   * jwt 서명을 확인하고 json을 디코딩한다!
   * 그런다음 validate() 동작함
   * 여기의 파라미터에는 사용자가 body에 던진 데이터가 username, password가 들어간다
   * 리턴할때 온전한 user를 찾아서 반환하면된다 , ( 패스워드는 빼자 )
   */

  // 사용자 존재 유무 및 패스워드 확인( 사용자가 던진 파라미터 일루옴 )
  async validate(username: string, password: string): Promise<any> {
    console.log('[1] 사용자 존재, 패스워드 일치 찾으러');
    console.log(username, password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // console.log('[1-2] 비밀번호가 틀리거나 없는 사용자 입니다');
      throw new UnauthorizedException();
    }
    // 컨트롤러로 리턴 @Request()에 들어있다
    return user;
  }
}
