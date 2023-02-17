import { Tag as TagPrisma } from '@prisma/client';

export class Tag implements TagPrisma {
  id: string;
  tagTitle: string;
  tagType: string;
}
