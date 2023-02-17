import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { SelectRoleDto } from './dto/select-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create({ roleName, roleDescription }: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        roleName,
        roleDescription,
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): PrismaPromise<Role[] | SelectRoleDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        roleName: true,
        roleDescription: true,
        permissions: {
          select: {
            id: true,
            permission: true,
          },
        },
      },
    });
  }

  findOne(id: string): PrismaPromise<Role> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  update(id: string, { roleName, roleDescription }: UpdateRoleDto) {
    return this.prisma.role.update({
      data: {
        roleName,
        roleDescription,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }
}
