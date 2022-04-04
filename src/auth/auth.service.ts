import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  // 생성자
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaClient,
  ) {}

  // 사용자 존재 유무 및 패스워드 확인 서비스
  async validateUser(username: string, pass: string): Promise<any> {
    console.log('[2] 서비스 authService 동작중');
    // 이부분을 실제 디비로 변경하자
    // const user = await this.usersService.findOne(username);
    //
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }

    // 실제 DB
    const user = await this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
    console.log('조회 user 확인');
    console.log(user);

    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  // 페이로드 토큰 생성 서비스
  async login(user: any) {
    //* 페이로드에 넣을 내용 *//
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload), // jwt 토큰 발급
    };
  }
}
