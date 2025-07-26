/*
  Warnings:

  - You are about to drop the column `content` on the `Brief` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Brief` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Brief` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[createdAt]` on the table `Brief` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Brief_date_topic_key";

-- AlterTable
ALTER TABLE "Brief" DROP COLUMN "content",
DROP COLUMN "date",
DROP COLUMN "topic";

-- CreateTable
CREATE TABLE "NarrativeRecord" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "briefId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NarrativeRecord_briefId_topic_key" ON "NarrativeRecord"("briefId", "topic");

-- CreateIndex
CREATE UNIQUE INDEX "Brief_createdAt_key" ON "Brief"("createdAt");

-- AddForeignKey
ALTER TABLE "NarrativeRecord" ADD CONSTRAINT "NarrativeRecord_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief"("id") ON DELETE CASCADE ON UPDATE CASCADE;
