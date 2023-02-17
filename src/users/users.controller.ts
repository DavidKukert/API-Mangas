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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
  ) {
    if (query.skip) query.skip = Number(query.skip);
    if (query.take) query.take = Number(query.take);
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Put(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'update_users',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RequiredPermissions({
    requiredRole: 'admin',
    requiredPermissions: 'delete_users',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
