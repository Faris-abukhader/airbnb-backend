/*
  Warnings:

  - You are about to drop the `LanguageSpoken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `languages` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `LanguageSpoken` DROP FOREIGN KEY `LanguageSpoken_propertyId_fkey`;

-- AlterTable
ALTER TABLE `Property` ADD COLUMN `languages` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `LanguageSpoken`;
