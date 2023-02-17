import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {
  constructor(private prisma: PrismaService) {}

  create({
    serieTitle,
    serieTitleAlt,
    serieAuthors,
    serieCover,
    serieSynopsis,
  }: CreateSeriesDto) {
    return this.prisma.serie.create({
      data: {
        serieTitle,
        serieTitleAlt: serieTitleAlt
          ? JSON.stringify(serieTitleAlt)
          : undefined,
        serieAuthors: serieAuthors ? JSON.stringify(serieAuthors) : undefined,
        serieCover,
        serieSynopsis,
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SerieWhereUniqueInput;
    where?: Prisma.SerieWhereInput;
    orderBy?: Prisma.SerieOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.serie.findMany({ skip, take, cursor, where, orderBy });
  }

  findOne(id: string) {
    return this.prisma.serie.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateSeriesDto: UpdateSeriesDto) {
    if (updateSeriesDto.serieTitleAlt) {
      updateSeriesDto.serieTitleAlt = JSON.stringify(
        updateSeriesDto.serieTitleAlt,
      );
    }
    if (updateSeriesDto.serieAuthors) {
      updateSeriesDto.serieAuthors = JSON.stringify(
        updateSeriesDto.serieAuthors,
      );
    }
    return this.prisma.serie.update({
      where: {
        id,
      },
      data: updateSeriesDto,
    });
  }

  remove(id: string) {
    return this.prisma.serie.delete({ where: { id } });
  }
}
