import { SetMetadata } from '@nestjs/common';

export interface PermissionsDecoratorProps {
  requiredPermissions?: string;
  requiredRole?: string;
}

export const RequiredPermissions = (args: PermissionsDecoratorProps) =>
  SetMetadata('permissions', args);
