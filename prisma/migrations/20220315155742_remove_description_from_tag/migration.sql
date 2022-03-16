/*
  Warnings:

  - You are about to drop the column `description` on the `tags` table. All the data in the column will be lost.
  - Made the column `image_url` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `image_url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tags` DROP COLUMN `description`;
