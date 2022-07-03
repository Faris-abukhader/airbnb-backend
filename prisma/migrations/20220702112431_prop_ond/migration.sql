-- DropForeignKey
ALTER TABLE `BookingOrder` DROP FOREIGN KEY `BookingOrder_propertyId_fkey`;

-- DropForeignKey
ALTER TABLE `PropertyAmenity` DROP FOREIGN KEY `PropertyAmenity_propertyId_fkey`;

-- DropForeignKey
ALTER TABLE `PropertyFacility` DROP FOREIGN KEY `PropertyFacility_propertyId_fkey`;

-- DropForeignKey
ALTER TABLE `languageSpoken` DROP FOREIGN KEY `languageSpoken_propertyId_fkey`;

-- AddForeignKey
ALTER TABLE `languageSpoken` ADD CONSTRAINT `languageSpoken_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyAmenity` ADD CONSTRAINT `PropertyAmenity_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyFacility` ADD CONSTRAINT `PropertyFacility_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingOrder` ADD CONSTRAINT `BookingOrder_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
