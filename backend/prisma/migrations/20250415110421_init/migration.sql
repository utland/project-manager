/*
  Warnings:

  - Added the required column `projectId` to the `SubtaskModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subtaskmodel` ADD COLUMN `projectId` VARCHAR(191) NOT NULL;
