/*
  Warnings:

  - Added the required column `userId` to the `TaskModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `taskmodel` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_BlockModelToUserModel` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BlockModelToUserModel_AB_unique`(`A`, `B`),
    INDEX `_BlockModelToUserModel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlockModelToUserModel` ADD CONSTRAINT `_BlockModelToUserModel_A_fkey` FOREIGN KEY (`A`) REFERENCES `BlockModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlockModelToUserModel` ADD CONSTRAINT `_BlockModelToUserModel_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
