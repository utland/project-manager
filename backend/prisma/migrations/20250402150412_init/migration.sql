/*
  Warnings:

  - You are about to drop the `_projecttouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projecttouser` DROP FOREIGN KEY `_ProjectToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttouser` DROP FOREIGN KEY `_ProjectToUser_B_fkey`;

-- DropTable
DROP TABLE `_projecttouser`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `UserModel` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `info` VARCHAR(191) NOT NULL,
    `photoUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectToUserModel` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectToUserModel_AB_unique`(`A`, `B`),
    INDEX `_ProjectToUserModel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectToUserModel` ADD CONSTRAINT `_ProjectToUserModel_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToUserModel` ADD CONSTRAINT `_ProjectToUserModel_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
