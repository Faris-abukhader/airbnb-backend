/*
  Warnings:

  - You are about to drop the `_ClientToNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_id_fkey`;

-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_id_fkey`;

-- DropForeignKey
ALTER TABLE `_ClientToNotification` DROP FOREIGN KEY `_ClientToNotification_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ClientToNotification` DROP FOREIGN KEY `_ClientToNotification_B_fkey`;

-- DropIndex
DROP INDEX `Notification_recieverId_fkey` ON `Notification`;

-- DropTable
DROP TABLE `_ClientToNotification`;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_recieverId_fkey` FOREIGN KEY (`recieverId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
