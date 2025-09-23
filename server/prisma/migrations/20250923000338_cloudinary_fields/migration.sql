/*
  Warnings:

  - A unique constraint covering the columns `[cloudPublicId]` on the table `bagsizes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cloudPublicId]` on the table `slides` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cloudPublicId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `bagsizes` ADD COLUMN `cloudPublicId` VARCHAR(191) NULL,
    ADD COLUMN `cloudSecureUrl` VARCHAR(191) NULL,
    MODIFY `iconUrl` TEXT NULL;

-- AlterTable
ALTER TABLE `slides` ADD COLUMN `cloudPublicId` VARCHAR(191) NULL,
    ADD COLUMN `cloudSecureUrl` VARCHAR(191) NULL,
    MODIFY `imageUrl` TEXT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `cloudPublicId` VARCHAR(191) NULL,
    ADD COLUMN `cloudSecureUrl` VARCHAR(191) NULL,
    MODIFY `imageUrl` TEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `bagsizes_cloudPublicId_key` ON `bagsizes`(`cloudPublicId`);

-- CreateIndex
CREATE UNIQUE INDEX `slides_cloudPublicId_key` ON `slides`(`cloudPublicId`);

-- CreateIndex
CREATE UNIQUE INDEX `users_cloudPublicId_key` ON `users`(`cloudPublicId`);
