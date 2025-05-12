/*
  Warnings:

  - You are about to drop the `_projectmodeltousermodel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projectmodeltousermodel` DROP FOREIGN KEY `_ProjectModelToUserModel_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projectmodeltousermodel` DROP FOREIGN KEY `_ProjectModelToUserModel_B_fkey`;

-- AlterTable
ALTER TABLE `projectmodel` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `_projectmodeltousermodel`;

-- CreateTable
CREATE TABLE `_UserToProject` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserToProject_AB_unique`(`A`, `B`),
    INDEX `_UserToProject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Invites` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Invites_AB_unique`(`A`, `B`),
    INDEX `_Invites_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserToProject` ADD CONSTRAINT `_UserToProject_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProjectModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToProject` ADD CONSTRAINT `_UserToProject_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Invites` ADD CONSTRAINT `_Invites_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProjectModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Invites` ADD CONSTRAINT `_Invites_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
