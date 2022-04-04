import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllBoard() {
    const posts = await this.prisma.board.findMany();
    console.log('===========================================================');
    console.log(posts);
    console.log('===========================================================');
    return posts;
  }
}
