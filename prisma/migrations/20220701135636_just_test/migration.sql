-- CreateTable
CREATE TABLE `test1` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_test1Totest2` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_test1Totest2_AB_unique`(`A`, `B`),
    INDEX `_test1Totest2_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_test1Totest2` ADD CONSTRAINT `_test1Totest2_A_fkey` FOREIGN KEY (`A`) REFERENCES `test1`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_test1Totest2` ADD CONSTRAINT `_test1Totest2_B_fkey` FOREIGN KEY (`B`) REFERENCES `test2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
