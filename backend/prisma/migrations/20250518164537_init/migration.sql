/*
  Warnings:

  - The primary key for the `blockmodel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `subtaskmodel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `taskmodel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `BlockModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `SubtaskModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `TaskModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subtaskmodel` DROP FOREIGN KEY `SubtaskModel_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `taskmodel` DROP FOREIGN KEY `TaskModel_blockId_fkey`;

-- DropIndex
DROP INDEX `SubtaskModel_taskId_fkey` ON `subtaskmodel`;

-- DropIndex
DROP INDEX `TaskModel_blockId_fkey` ON `taskmodel`;

-- AlterTable
ALTER TABLE `blockmodel` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `subtaskmodel` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `taskmodel` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `BlockModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubtaskModel` ADD CONSTRAINT `SubtaskModel_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `TaskModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
