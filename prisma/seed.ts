import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const entitlies = ['Users', 'Roles', 'Permissions', 'Series', 'Chapters'];
const permissions = ['List', 'Show', 'Create', 'Update', 'Delete'];

const permissionsDb: Prisma.PermissionCreateInput[] = [];

entitlies.map((entitly) => {
  permissions.map((permission) => {
    permissionsDb.push({
      permissionDescription: `${permission} ${entitly}`,
      permissionName: `${permission.toLowerCase()}_${entitly.toLowerCase()}`,
      roles: {
        create: {
          role: {
            connectOrCreate: {
              create: {
                roleName: 'admin',
                roleDescription: 'Admin',
              },
              where: {
                roleName: 'admin',
              },
            },
          },
        },
      },
    });
  });
});

const uploadsEntitlies = ['Cover', 'Chapter Pages'];
const uploadsPermissions = ['Uploads'];

uploadsEntitlies.map((entitly) => {
  uploadsPermissions.map((permission) => {
    permissionsDb.push({
      permissionDescription: `${permission} ${entitly}`,
      permissionName: `${permission.toLowerCase()}_${entitly
        .replace(' ', '_')
        .toLowerCase()}`,
      roles: {
        create: {
          role: {
            connectOrCreate: {
              create: {
                roleName: 'admin',
                roleDescription: 'Admin',
              },
              where: {
                roleName: 'admin',
              },
            },
          },
        },
      },
    });
  });
});

async function main() {
  await Promise.all(
    permissionsDb.map(
      async ({ permissionDescription, permissionName, roles }) => {
        const perm = await prisma.permission.findUnique({
          where: {
            permissionName,
          },
        });
        if (!perm) {
          await prisma.permission.create({
            data: {
              permissionDescription,
              permissionName,
              roles,
            },
          });
        }
      },
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
