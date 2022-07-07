/*
  Warnings:

  - Added the required column `guestId` to the `BookingOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookingOrder` ADD COLUMN `guestId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BookingOrder` ADD CONSTRAINT `BookingOrder_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
