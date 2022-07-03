/*
  Warnings:

  - You are about to drop the `_test1Totest2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test3` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_test1Totest2` DROP FOREIGN KEY `_test1Totest2_A_fkey`;

-- DropForeignKey
ALTER TABLE `_test1Totest2` DROP FOREIGN KEY `_test1Totest2_B_fkey`;

-- DropTable
DROP TABLE `_test1Totest2`;

-- DropTable
DROP TABLE `test1`;

-- DropTable
DROP TABLE `test2`;

-- DropTable
DROP TABLE `test3`;
