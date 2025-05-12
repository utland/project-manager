/*
  Warnings:

  - You are about to drop the column `parentId` on the `blockmodel` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `BlockModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blockmodel` DROP FOREIGN KEY `BlockModel_parentId_fkey`;

-- DropIndex
DROP INDEX `BlockModel_parentId_fkey` ON `blockmodel`;

-- AlterTable
ALTER TABLE `blockmodel` DROP COLUMN `parentId`,
    ADD COLUMN `projectId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BlockModel` ADD CONSTRAINT `BlockModel_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `ProjectModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
