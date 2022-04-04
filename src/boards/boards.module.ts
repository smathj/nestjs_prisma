import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { AppService } from '../app.service';
import { PrismaClient } from '@prisma/client';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

@Module({
  imports: [
    // 옵션 없이 업로드 넘길때 기본값으로 사용할 경로 여기서 한번에 지정한다
    // MulterModule.register({
    //   dest: './public/images',
    // }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, AppService, PrismaClient],
})
export class BoardsModule {}
