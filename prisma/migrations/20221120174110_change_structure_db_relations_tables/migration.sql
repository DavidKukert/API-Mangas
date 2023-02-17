-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_permissionsOnRoles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    CONSTRAINT "permissionsOnRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "permissionsOnRoles_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_permissionsOnRoles" ("id", "permissionId", "roleId") SELECT "id", "permissionId", "roleId" FROM "permissionsOnRoles";
DROP TABLE "permissionsOnRoles";
ALTER TABLE "new_permissionsOnRoles" RENAME TO "permissionsOnRoles";
CREATE UNIQUE INDEX "permissionsOnRoles_roleId_permissionId_key" ON "permissionsOnRoles"("roleId", "permissionId");
CREATE TABLE "new_rolesOnUsers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "rolesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "rolesOnUsers_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_rolesOnUsers" ("id", "roleId", "userId") SELECT "id", "roleId", "userId" FROM "rolesOnUsers";
DROP TABLE "rolesOnUsers";
ALTER TABLE "new_rolesOnUsers" RENAME TO "rolesOnUsers";
CREATE UNIQUE INDEX "rolesOnUsers_userId_roleId_key" ON "rolesOnUsers"("userId", "roleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
