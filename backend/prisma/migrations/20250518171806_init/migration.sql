-- DropForeignKey
ALTER TABLE `blockmodel` DROP FOREIGN KEY `BlockModel_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `subtaskmodel` DROP FOREIGN KEY `SubtaskModel_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `taskmodel` DROP FOREIGN KEY `TaskModel_blockId_fkey`;

-- DropForeignKey
ALTER TABLE `taskmodel` DROP FOREIGN KEY `TaskModel_projectId_fkey`;

-- DropIndex
DROP INDEX `BlockModel_projectId_fkey` ON `blockmodel`;

-- DropIndex
DROP INDEX `SubtaskModel_taskId_fkey` ON `subtaskmodel`;

-- DropIndex
DROP INDEX `TaskModel_blockId_fkey` ON `taskmodel`;

-- DropIndex
DROP INDEX `TaskModel_projectId_fkey` ON `taskmodel`;

-- AddForeignKey
ALTER TABLE `BlockModel` ADD CONSTRAINT `BlockModel_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `ProjectModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `ProjectModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `BlockModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubtaskModel` ADD CONSTRAINT `SubtaskModel_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `TaskModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
