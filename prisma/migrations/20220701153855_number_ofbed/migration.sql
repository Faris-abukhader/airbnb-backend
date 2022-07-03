/*
  Warnings:

  - You are about to alter the column `numberOFBed` on the `BedOption` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `BedOption` MODIFY `numberOFBed` INTEGER NOT NULL;
