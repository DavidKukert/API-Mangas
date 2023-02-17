import { Prisma } from '@prisma/client';

export class CreateSeriesDto implements Prisma.SerieCreateInput {
  id?: string;
  serieTitle: string;
  serieTitleAlt?: string;
  serieAuthors: string;
  serieCover: string;
  serieSynopsis: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  tags?: Prisma.TagsOnSeriesCreateNestedManyWithoutSerieInput;
}
