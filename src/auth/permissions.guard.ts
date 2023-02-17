import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionsDecoratorProps } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { requiredPermissions, requiredRole } =
      this.reflector.getAllAndOverride<PermissionsDecoratorProps>(
        'permissions',
        [context.getHandler(), context.getClass()],
      );
    if (!requiredPermissions && !requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const match = await this.prisma.user.count({
      where: {
        id: user.sub,
        roles: {
          some: {
            role: {
              OR: [
                {
                  roleName: requiredRole,
                },
                {
                  permissions: {
                    some: {
                      permission: {
                        permissionName: requiredPermissions,
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    });
    console.log(match);
    return match >= 1;
  }
}
