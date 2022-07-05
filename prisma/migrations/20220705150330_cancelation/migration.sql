/*
  Warnings:

  - You are about to drop the column `cancellationPolicy` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `cancellationPolicy`;

-- CreateTable
CREATE TABLE `cancelationPolicy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyId` INTEGER NOT NULL,

    UNIQUE INDEX `cancelationPolicy_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cancelationOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `offSetMilli` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cancelationPolicy` ADD CONSTRAINT `cancelationPolicy_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
