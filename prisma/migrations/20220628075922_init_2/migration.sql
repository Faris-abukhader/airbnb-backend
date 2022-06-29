/*
  Warnings:

  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdate` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisherId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastUpdate` DATETIME(3) NOT NULL,
    ADD COLUMN `publisherId` INTEGER NOT NULL,
    ADD COLUMN `seenNumber` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_publisherId_fkey` FOREIGN KEY (`publisherId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
