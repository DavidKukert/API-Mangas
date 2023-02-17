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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequiredPermissions } from 'src/auth/permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'create_series',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  create(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }

  @Get()
  findAll(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.SerieWhereUniqueInput;
      where?: Prisma.SerieWhereInput;
      orderBy?: Prisma.SerieOrderByWithRelationInput;
    },
  ) {
    if (query.skip) query.skip = Number(query.skip);
    if (query.take) query.take = Number(query.take);
    return this.seriesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(id);
  }

  @Put(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'update_series',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  update(@Param('id') id: string, @Body() updateSeriesDto: UpdateSeriesDto) {
    return this.seriesService.update(id, updateSeriesDto);
  }

  @Delete(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'delete_series',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  remove(@Param('id') id: string) {
    return this.seriesService.remove(id);
  }
}
