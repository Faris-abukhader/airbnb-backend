/*
  Warnings:

  - You are about to drop the column `amenityId` on the `PropertyAmenity` table. All the data in the column will be lost.
  - You are about to drop the `_AmenityToPropertyAmenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FacilityToPropertyFacility` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon` to the `PropertyAmenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `PropertyFacility` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_AmenityToPropertyAmenity` DROP FOREIGN KEY `_AmenityToPropertyAmenity_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AmenityToPropertyAmenity` DROP FOREIGN KEY `_AmenityToPropertyAmenity_B_fkey`;

-- DropForeignKey
ALTER TABLE `_FacilityToPropertyFacility` DROP FOREIGN KEY `_FacilityToPropertyFacility_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FacilityToPropertyFacility` DROP FOREIGN KEY `_FacilityToPropertyFacility_B_fkey`;

-- AlterTable
ALTER TABLE `Amenity` ADD COLUMN `icon` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Facility` ADD COLUMN `icon` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `PropertyAmenity` DROP COLUMN `amenityId`,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PropertyFacility` ADD COLUMN `icon` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_AmenityToPropertyAmenity`;

-- DropTable
DROP TABLE `_FacilityToPropertyFacility`;
