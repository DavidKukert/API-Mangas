import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../entities/role.entity';

export class SelectRoleDto extends PartialType(Role) {}
