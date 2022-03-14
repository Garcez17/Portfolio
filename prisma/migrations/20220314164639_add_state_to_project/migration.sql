/*
  Warnings:

  - Added the required column `state` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `state` VARCHAR(191) NOT NULL,
    MODIFY `image_url` VARCHAR(191) NULL,
    MODIFY `demo_url` VARCHAR(191) NULL,
    MODIFY `repository_url` VARCHAR(191) NULL;
