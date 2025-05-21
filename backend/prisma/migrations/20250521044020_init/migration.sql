-- DropForeignKey
ALTER TABLE `taskmodel` DROP FOREIGN KEY `TaskModel_userId_fkey`;

-- DropIndex
DROP INDEX `TaskModel_userId_fkey` ON `taskmodel`;

-- AlterTable
ALTER TABLE `taskmodel` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TaskModel` ADD CONSTRAINT `TaskModel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
