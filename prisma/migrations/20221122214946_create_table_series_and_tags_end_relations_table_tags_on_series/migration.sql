-- CreateTable
CREATE TABLE "series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieTitle" TEXT NOT NULL,
    "serieTitleAlt" TEXT,
    "serieAuthors" TEXT NOT NULL,
    "serieCover" TEXT NOT NULL,
    "serieSynopsis" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tagTitle" TEXT NOT NULL,
    "tagType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tagsOnSeries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serieId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    CONSTRAINT "tagsOnSeries_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tagsOnSeries_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "series_serieTitle_key" ON "series"("serieTitle");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tagTitle_key" ON "tags"("tagTitle");

-- CreateIndex
CREATE UNIQUE INDEX "tagsOnSeries_serieId_tagId_key" ON "tagsOnSeries"("serieId", "tagId");
