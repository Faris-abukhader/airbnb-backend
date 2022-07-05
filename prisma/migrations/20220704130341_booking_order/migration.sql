/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `BookingReview` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `BookingReview` DROP FOREIGN KEY `BookingReview_bookingId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `BookingReview_bookingId_key` ON `BookingReview`(`bookingId`);

-- AddForeignKey
ALTER TABLE `BookingReview` ADD CONSTRAINT `BookingReview_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `BookingOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
