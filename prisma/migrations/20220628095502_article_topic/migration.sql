/*
  Warnings:

  - Added the required column `topic` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ArticleTopic` DROP FOREIGN KEY `ArticleTopic_id_fkey`;

-- AlterTable
ALTER TABLE `Article` ADD COLUMN `topic` VARCHAR(191) NOT NULL;
