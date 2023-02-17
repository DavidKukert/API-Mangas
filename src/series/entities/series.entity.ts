import { Serie as SeriePrisma } from '@prisma/client';

export class Series implements SeriePrisma {
  id: string;
  serieTitle: string;
  serieTitleAlt: string;
  serieAuthors: string;
  serieCover: string;
  serieSynopsis: string;
  createdAt: Date;
  updatedAt: Date;
}
