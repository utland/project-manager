-- DropForeignKey
ALTER TABLE `taskmodel` DROP FOREIGN KEY `TaskModel_blockId_fkey`;

-- DropIndex
DROP INDEX `TaskModel_blockId_fkey` ON `taskmodel`;

-- AlterTable
ALTER TABLE `taskmodel` MODIFY `blockId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `BlockModel`(`key`) ON DELETE SET NULL ON UPDATE CASCADE;
