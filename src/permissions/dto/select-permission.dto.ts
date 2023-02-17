import { PartialType } from '@nestjs/mapped-types';
import { Permission } from '../entities/permission.entity';

export class SelectPermissionDto extends PartialType(Permission) {}
