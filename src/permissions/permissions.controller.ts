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
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'create_permissions',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'list_permissions',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  findAll(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PermissionWhereUniqueInput;
      where?: Prisma.PermissionWhereInput;
      orderBy?: Prisma.PermissionOrderByWithRelationInput;
    },
  ) {
    if (query.skip) query.skip = Number(query.skip);
    if (query.take) query.take = Number(query.take);
    return this.permissionsService.findAll(query);
  }

  @Get(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'show_permissions',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Put(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'update_permissions',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'delete_permissions',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
