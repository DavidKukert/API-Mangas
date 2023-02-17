import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
