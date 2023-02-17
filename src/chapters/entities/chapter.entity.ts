import { Chapter as ChapterPrisma } from '@prisma/client';

export class Chapter implements ChapterPrisma {
  id: string;
  chapterNumber: string;
  chapterTitle: string;
  chapterPages: string;
  createdAt: Date;
  updatedAt: Date;
  serieId: string;
}
