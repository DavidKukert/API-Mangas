import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequiredPermissions } from 'src/auth/permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'create_roles',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'list_roles',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  findAll(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.RoleWhereUniqueInput;
      where?: Prisma.RoleWhereInput;
      orderBy?: Prisma.RoleOrderByWithRelationInput;
    },
  ) {
    if (query.skip) query.skip = Number(query.skip);
    if (query.take) query.take = Number(query.take);
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'show_roles',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'update_roles',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'delete_roles',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
