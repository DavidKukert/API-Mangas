-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chapters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterNumber" TEXT NOT NULL,
    "chapterTitle" TEXT,
    "chapterPages" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serieId" TEXT NOT NULL,
    CONSTRAINT "chapters_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_chapters" ("chapterNumber", "chapterPages", "chapterTitle", "createdAt", "id", "serieId", "updatedAt") SELECT "chapterNumber", "chapterPages", "chapterTitle", "createdAt", "id", "serieId", "updatedAt" FROM "chapters";
DROP TABLE "chapters";
ALTER TABLE "new_chapters" RENAME TO "chapters";
CREATE UNIQUE INDEX "chapters_chapterNumber_serieId_key" ON "chapters"("chapterNumber", "serieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
