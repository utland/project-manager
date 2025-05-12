/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `UserModel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `usermodel` MODIFY `photoUrl` VARCHAR(191) NOT NULL DEFAULT '../public/avatar.png';

-- CreateIndex
CREATE UNIQUE INDEX `UserModel_login_key` ON `UserModel`(`login`);
