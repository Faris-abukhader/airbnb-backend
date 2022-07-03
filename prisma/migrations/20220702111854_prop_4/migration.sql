-- DropForeignKey
ALTER TABLE `PropertyApproved` DROP FOREIGN KEY `PropertyApproved_propertyId_fkey`;

-- AddForeignKey
ALTER TABLE `PropertyApproved` ADD CONSTRAINT `PropertyApproved_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
