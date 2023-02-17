import { Prisma } from '@prisma/client';

export class CreateChapterDto implements Prisma.ChapterCreateInput {
  id?: string;
  chapterNumber: string;
  chapterTitle?: string;
  chapterPages: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  serie: Prisma.SerieCreateNestedOneWithoutChaptersInput;
}
