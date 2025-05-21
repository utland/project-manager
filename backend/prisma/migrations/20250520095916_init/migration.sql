/*
  Warnings:

  - Added the required column `blockId` to the `SubtaskModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subtaskmodel` ADD COLUMN `blockId` VARCHAR(191) NOT NULL;
