-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastUpdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
