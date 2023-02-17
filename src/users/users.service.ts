import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SelectUserDto } from './dto/select-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private hash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  create({ username, password }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username,
        password: this.hash(password),
        roles: {
          create: {
            role: {
              connectOrCreate: {
                create: {
                  roleName: 'reader',
                  roleDescription: 'Reader',
                },
                where: {
                  roleName: 'reader',
                },
              },
            },
          },
        },
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): PrismaPromise<User[] | SelectUserDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  findOne(
    where: Prisma.UserWhereUniqueInput,
    selectPassword = false,
  ): PrismaPromise<User | SelectUserDto> {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        password: selectPassword,
        createdAt: true,
        updatedAt: true,
        roles: {
          select: {
            role: true,
          },
        },
      },
      where,
    });
  }

  update(id: string, { username, password }: UpdateUserDto) {
    return this.prisma.user.update({
      data: {
        username,
        password: password !== undefined ? this.hash(password) : undefined,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
