import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  Session,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from '../dtos/post.dto';
import { Request, Response } from 'express';
import { AppService } from '../app.service';
import { BoardsService } from './boards.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly appService: AppService,
    private readonly boardService: BoardsService,
  ) {}

  // private storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, '/tmp/my-uploads');
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now());
  //   },
  // });

  //* [게시판] *//
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getBoard(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    // post 가져오기
    const posts = await this.boardService.findAllBoard();
    res.locals.email = session.email;
    res.render('board', { posts: posts });
  }

  //* [글 작성] *//
  @Post('/write')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => {
          const uuid = uuidv4();
          const fileName = uuid + path.extname(file.originalname);
          // new Date().getTime() + path.extname(file.originalname);
          cb(null, fileName);
        },
      }),
    }),
  )
  async postBoardWrite(
    @Body() post: PostDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('파일을 확인합시다');
    console.log(files);
    console.log(__dirname);
    const result = await this.appService.writeBoard(post, session.email);
    if (result) {
      res.redirect('/boards');
    } else {
      throw new HttpException('게시글 포스트 에러', 500);
    }
  }

  //* [글 작성폼] *//
  @Get('/write')
  @UseGuards(AuthGuard('jwt'))
  getBoardWrite(@Res() res: Response) {
    res.render('write');
  }
}
