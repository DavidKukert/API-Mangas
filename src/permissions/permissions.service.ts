import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { SelectPermissionDto } from './dto/select-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  create({ permissionName, permissionDescription }: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        permissionName,
        permissionDescription,
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PermissionWhereUniqueInput;
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithRelationInput;
  }): PrismaPromise<Permission[] | SelectPermissionDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.permission.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string): PrismaPromise<Permission> {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  update(
    id: string,
    { permissionName, permissionDescription }: UpdatePermissionDto,
  ) {
    return this.prisma.permission.update({
      data: {
        permissionName,
        permissionDescription,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
