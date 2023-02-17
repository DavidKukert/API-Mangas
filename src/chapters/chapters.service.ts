import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(private prisma: PrismaService) {}

  create(createChapterDto: CreateChapterDto) {
    createChapterDto.chapterPages = JSON.stringify(
      createChapterDto.chapterPages,
    );

    return this.prisma.chapter.create({
      data: createChapterDto,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChapterWhereUniqueInput;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.chapter.findMany({ skip, take, cursor, where, orderBy });
  }

  findOne(id: string) {
    return this.prisma.chapter.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateChapterDto: UpdateChapterDto) {
    if (
      updateChapterDto.chapterPages &&
      typeof updateChapterDto.chapterPages !== 'string'
    ) {
      updateChapterDto.chapterPages = JSON.stringify(
        updateChapterDto.chapterPages,
      );
    }

    return this.prisma.chapter.update({
      where: { id },
      data: updateChapterDto,
    });
  }

  remove(id: string) {
    return this.prisma.chapter.delete({ where: { id } });
  }

  async existis(id: string) {
    const match = await this.prisma.chapter.count({ where: { id } });
    return match;
  }
}
