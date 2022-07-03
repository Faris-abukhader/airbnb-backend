-- AlterTable
ALTER TABLE `PropertyApproved` MODIFY `isApproved` BOOLEAN NULL,
    MODIFY `approvedDate` DATETIME(3) NULL,
    MODIFY `isRefused` BOOLEAN NULL DEFAULT false,
    MODIFY `dateOfRefused` DATETIME(3) NULL;
