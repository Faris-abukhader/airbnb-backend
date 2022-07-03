/*
  Warnings:

  - You are about to drop the `_LanguageToLanguageSpoken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `languages` to the `LanguageSpoken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_LanguageToLanguageSpoken` DROP FOREIGN KEY `_LanguageToLanguageSpoken_A_fkey`;

-- DropForeignKey
ALTER TABLE `_LanguageToLanguageSpoken` DROP FOREIGN KEY `_LanguageToLanguageSpoken_B_fkey`;

-- AlterTable
ALTER TABLE `LanguageSpoken` ADD COLUMN `languages` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_LanguageToLanguageSpoken`;
