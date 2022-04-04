import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { PrismaClient } from '@prisma/client';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // 모듈을 넣을꺼면 import, 단일 생성자주입이면 providers
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaClient],
  exports: [AuthService],
})
export class AuthModule {}
