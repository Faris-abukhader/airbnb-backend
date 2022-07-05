/*
  Warnings:

  - You are about to drop the column `tags` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Article` DROP COLUMN `tags`;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `articleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
