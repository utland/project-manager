/*
  Warnings:

  - You are about to drop the column `userId` on the `taskmodel` table. All the data in the column will be lost.
  - You are about to drop the `_blockmodeltousermodel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_blockmodeltousermodel` DROP FOREIGN KEY `_BlockModelToUserModel_A_fkey`;

-- DropForeignKey
ALTER TABLE `_blockmodeltousermodel` DROP FOREIGN KEY `_BlockModelToUserModel_B_fkey`;

-- DropForeignKey
ALTER TABLE `taskmodel` DROP FOREIGN KEY `TaskModel_userId_fkey`;

-- DropIndex
DROP INDEX `TaskModel_userId_fkey` ON `taskmodel`;

-- AlterTable
ALTER TABLE `taskmodel` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `_blockmodeltousermodel`;
