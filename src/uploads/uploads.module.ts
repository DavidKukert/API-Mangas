import { Module } from '@nestjs/common';
import { ChaptersModule } from 'src/chapters/chapters.module';
import { SeriesModule } from 'src/series/series.module';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
  imports: [SeriesModule, ChaptersModule],
})
export class UploadsModule {}
