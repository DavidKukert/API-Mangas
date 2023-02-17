import { Prisma } from '@prisma/client';

export class CreateTagDto implements Prisma.TagCreateInput {
  id?: string;
  tagTitle: string;
  tagType: string;
  series?: Prisma.TagsOnSeriesCreateNestedManyWithoutTagInput;
}
