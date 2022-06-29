-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_recieverId_fkey`;

-- CreateTable
CREATE TABLE `_ClientToNotification` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClientToNotification_AB_unique`(`A`, `B`),
    INDEX `_ClientToNotification_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClientToNotification` ADD CONSTRAINT `_ClientToNotification_A_fkey` FOREIGN KEY (`A`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientToNotification` ADD CONSTRAINT `_ClientToNotification_B_fkey` FOREIGN KEY (`B`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
