-- DropForeignKey
ALTER TABLE `BedOption` DROP FOREIGN KEY `BedOption_propertyId_fkey`;

-- AddForeignKey
ALTER TABLE `BedOption` ADD CONSTRAINT `BedOption_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
