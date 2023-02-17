import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequiredPermissions } from 'src/auth/permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { ChaptersService } from 'src/chapters/chapters.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeriesService } from 'src/series/series.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly seriesService: SeriesService,
    private readonly chaptersService: ChaptersService,
  ) {}

  @Get('serie/:serieId')
  async showCover(@Param('serieId') id: string, @Res() res: Response) {
    const serie = await this.seriesService.findOne(id);
    if (!serie) {
      throw 'Not Found';
    }
    const coverPath = path.resolve(
      'public',
      'uploads',
      'serie',
      serie.id,
      serie.serieCover,
    );
    if (!existsSync(coverPath)) {
      throw 'Not Found';
    }
    return res.sendFile(coverPath);
  }

  @Post('serie/:serieId')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'uploads_cover',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UseInterceptors(
    FileInterceptor('serieCover', {
      storage: diskStorage({
        destination(req, file, callback) {
          const { serieId } = req.params;
          const uploadPath = path.resolve(
            'public',
            'uploads',
            'serie',
            serieId,
          );
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          const { serieId } = req.params;
          cb(null, `${serieId}${path.extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadCover(
    @UploadedFile() file: Express.Multer.File,
    @Param('serieId') id: string,
  ) {
    return this.seriesService.update(id, {
      serieCover: file.filename,
    });
  }

  @Get('chapter/:chapterId/:page')
  async showChapterPage(
    @Param('chapterId') id: string,
    @Param('page') page: string,
    @Res() res: Response,
  ) {
    const chapter = await this.chaptersService.findOne(id);
    if (!chapter) {
      throw 'Not Found';
    }
    const pagePath = path.resolve(
      'public',
      'uploads',
      'serie',
      chapter.serieId,
      'chapters',
      chapter.id,
      page,
    );
    if (!existsSync(pagePath)) {
      throw 'Not Found';
    }
    return res.sendFile(pagePath);
  }

  @Post('chapter/:chapterId')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'uploads_chapter_pages',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UseInterceptors(
    FilesInterceptor('chapterPages', 99, {
      storage: diskStorage({
        async destination(req, file, callback) {
          const prismaService = new PrismaService();
          const { chapterId } = req.params;
          const chapter = await prismaService.chapter.findUnique({
            where: { id: chapterId },
          });
          const uploadPath = path.resolve(
            'public',
            'uploads',
            'serie',
            chapter.serieId,
            'chapters',
            chapterId,
          );
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadChapterPages(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('chapterId') id: string,
  ) {
    return this.chaptersService.update(id, {
      chapterPages: JSON.stringify(
        files.map((file) => {
          return file.filename;
        }),
      ),
    });
  }
}
