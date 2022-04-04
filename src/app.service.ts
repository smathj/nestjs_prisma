import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostDto } from './dtos/post.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  // private prisma;

  constructor(private readonly prisma: PrismaClient) {
    // const prisma = new PrismaClient();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async writeBoard(postParam: PostDto, email: string) {
    // email로 유저의 아이디 구하기
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const result = await this.prisma.board.create({
      data: {
        title: postParam.title,
        content: postParam.content,
        authorId: user.id,
      },
    });
    return result;
  }
}
