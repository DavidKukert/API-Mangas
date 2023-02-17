import { Prisma } from '@prisma/client';

export class CreatePermissionDto implements Prisma.PermissionCreateInput {
  id?: string;
  permissionName: string;
  permissionDescription: string;
  roles?: Prisma.PermissionsOnRolesCreateNestedManyWithoutPermissionInput;
}
