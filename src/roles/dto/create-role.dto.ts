import { Prisma } from '@prisma/client';

export class CreateRoleDto implements Prisma.RoleCreateInput {
  id?: string;
  roleName: string;
  roleDescription: string;
  permissions?: Prisma.PermissionsOnRolesCreateNestedManyWithoutRoleInput;
  users?: Prisma.RolesOnUsersCreateNestedManyWithoutRoleInput;
}
