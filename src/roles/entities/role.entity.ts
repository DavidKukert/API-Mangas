import { Role as RolePrisma } from '@prisma/client';

export class Role implements RolePrisma {
  id: string;
  roleName: string;
  roleDescription: string;
}
