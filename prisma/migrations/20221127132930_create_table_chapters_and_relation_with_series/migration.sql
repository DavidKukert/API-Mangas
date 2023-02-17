-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterNumber" TEXT NOT NULL,
    "chapterTitle" TEXT,
    "chapterPages" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "serieId" TEXT NOT NULL,
    CONSTRAINT "chapters_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "chapters_chapterNumber_serieId_key" ON "chapters"("chapterNumber", "serieId");
