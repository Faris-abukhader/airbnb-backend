-- AlterTable
ALTER TABLE `BookingOrder` ADD COLUMN `acceptionDate` DATETIME(3) NULL,
    ADD COLUMN `isAccepted` BOOLEAN NULL,
    ADD COLUMN `isRefused` BOOLEAN NULL,
    ADD COLUMN `refusedDate` DATETIME(3) NULL,
    ADD COLUMN `refusedReason` VARCHAR(191) NULL;
