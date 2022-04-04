import {
  Body,
  Controller,
  Get,
  HttpException,
  Next,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Response, Request } from 'express';

import { AppService } from './app.service';
import { LoginInterceptor } from './common/interceptor/login.interceptor';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Get()
  index(@Res() res: Response) {
    res.render('index');
  }

  // 인터셉터 테스트용 컨트롤러
  @Get('/test')
  @UseInterceptors(LoginInterceptor)
  test(@Req() req: Request, @Res() res: Response) {
    console.log(`req['myFlag'] = ${req['myFlag']}`);
    if (!req['myFlag']) {
      res.redirect('/');
    }
  }

  @Get('/join')
  getJoin(@Res() res: Response) {
    res.render('join');
  }

  //* [로그아웃] *//
  @Get('/auth/logout')
  logout(@Res() res: Response) {
    // 세션 쿠키 삭제
    res.clearCookie('connect.sid').redirect('/');
  }

  //* [로그인] *//
  @UseGuards(AuthGuard('local')) // 가드 장착(로컬)
  @Post('auth/login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    console.log('[3] req.user 확인');
    const token = await this.authService.login(req.user);
    console.log(token.access_token);

    // 세션에 jwt 저장
    session.email = req.user['email'];
    session.jwt = token.access_token;
    // req.session.save((err) => {
    //   if (err) {
    //     console.log('jwt 토큰 세션에 저장하다 실패가 발생하였습니다');
    //   }
    // });

    res.redirect('/boards');
  }

  //* [프로필] *//
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
