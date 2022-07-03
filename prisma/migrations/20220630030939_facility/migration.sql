-- DropForeignKey
ALTER TABLE `Facility` DROP FOREIGN KEY `Facility_id_fkey`;

-- CreateTable
CREATE TABLE `_FacilityToPropertyFacility` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FacilityToPropertyFacility_AB_unique`(`A`, `B`),
    INDEX `_FacilityToPropertyFacility_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FacilityToPropertyFacility` ADD CONSTRAINT `_FacilityToPropertyFacility_A_fkey` FOREIGN KEY (`A`) REFERENCES `Facility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacilityToPropertyFacility` ADD CONSTRAINT `_FacilityToPropertyFacility_B_fkey` FOREIGN KEY (`B`) REFERENCES `PropertyFacility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
