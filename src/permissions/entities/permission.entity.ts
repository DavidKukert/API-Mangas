import { Permission as PermissionPrisma } from '@prisma/client';

export class Permission implements PermissionPrisma {
  id: string;
  permissionName: string;
  permissionDescription: string;
}
