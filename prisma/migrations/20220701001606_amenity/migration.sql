-- DropForeignKey
ALTER TABLE `Amenity` DROP FOREIGN KEY `Amenity_id_fkey`;

-- CreateTable
CREATE TABLE `_AmenityToPropertyAmenity` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AmenityToPropertyAmenity_AB_unique`(`A`, `B`),
    INDEX `_AmenityToPropertyAmenity_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AmenityToPropertyAmenity` ADD CONSTRAINT `_AmenityToPropertyAmenity_A_fkey` FOREIGN KEY (`A`) REFERENCES `Amenity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AmenityToPropertyAmenity` ADD CONSTRAINT `_AmenityToPropertyAmenity_B_fkey` FOREIGN KEY (`B`) REFERENCES `PropertyAmenity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
