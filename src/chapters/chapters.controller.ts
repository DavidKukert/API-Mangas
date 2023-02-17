import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existsSync, rmSync } from 'fs';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequiredPermissions } from 'src/auth/permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'create_chapters',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  findAll(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ChapterWhereUniqueInput;
      where?: Prisma.ChapterWhereInput;
      orderBy?: Prisma.ChapterOrderByWithRelationInput;
    },
  ) {
    if (query.skip) query.skip = Number(query.skip);
    if (query.take) query.take = Number(query.take);
    return this.chaptersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(id);
  }

  @Put(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'update_chapters',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(id, updateChapterDto);
  }

  @Delete(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'delete_chapters',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async remove(@Param('id') id: string) {
    const chapter = await this.chaptersService.remove(id);

    const uploadPath = path.resolve(
      'public',
      'uploads',
      'serie',
      chapter.serieId,
      'chapters',
      chapter.id,
    );

    if (existsSync(uploadPath)) {
      rmSync(uploadPath, { recursive: true, force: true });
    }

    return { chapter };
  }
}
