/*
  Warnings:

  - You are about to drop the `_projecttousermodel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subtask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projecttousermodel` DROP FOREIGN KEY `_ProjectToUserModel_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttousermodel` DROP FOREIGN KEY `_ProjectToUserModel_B_fkey`;

-- DropForeignKey
ALTER TABLE `block` DROP FOREIGN KEY `Block_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `subtask` DROP FOREIGN KEY `Subtask_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_blockId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- DropTable
DROP TABLE `_projecttousermodel`;

-- DropTable
DROP TABLE `block`;

-- DropTable
DROP TABLE `project`;

-- DropTable
DROP TABLE `subtask`;

-- DropTable
DROP TABLE `task`;

-- CreateTable
CREATE TABLE `ProjectModel` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlockModel` (
    `key` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` ENUM('ToDo', 'InProcess', 'Done') NOT NULL DEFAULT 'ToDo',
    `parentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskModel` (
    `key` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('ToDo', 'InProcess', 'Done') NOT NULL DEFAULT 'ToDo',
    `projectId` VARCHAR(191) NOT NULL,
    `blockId` INTEGER NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubtaskModel` (
    `key` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('ToDo', 'InProcess', 'Done') NOT NULL DEFAULT 'ToDo',
    `taskId` INTEGER NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectModelToUserModel` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectModelToUserModel_AB_unique`(`A`, `B`),
    INDEX `_ProjectModelToUserModel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlockModel` ADD CONSTRAINT `BlockModel_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ProjectModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `BlockModel`(`key`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `ProjectModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubtaskModel` ADD CONSTRAINT `SubtaskModel_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `TaskModel`(`key`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectModelToUserModel` ADD CONSTRAINT `_ProjectModelToUserModel_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProjectModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectModelToUserModel` ADD CONSTRAINT `_ProjectModelToUserModel_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
