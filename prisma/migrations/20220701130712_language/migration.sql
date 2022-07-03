/*
  Warnings:

  - You are about to drop the column `language` on the `LanguageSpoken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `LanguageSpoken` DROP COLUMN `language`;

-- CreateTable
CREATE TABLE `_LanguageToLanguageSpoken` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LanguageToLanguageSpoken_AB_unique`(`A`, `B`),
    INDEX `_LanguageToLanguageSpoken_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LanguageToLanguageSpoken` ADD CONSTRAINT `_LanguageToLanguageSpoken_A_fkey` FOREIGN KEY (`A`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LanguageToLanguageSpoken` ADD CONSTRAINT `_LanguageToLanguageSpoken_B_fkey` FOREIGN KEY (`B`) REFERENCES `LanguageSpoken`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
