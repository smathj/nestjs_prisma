import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [AuthModule, UsersModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
