/*
  Warnings:

  - You are about to drop the column `image_url` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `demo_url` on the `project_tags` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `project_tags` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `project_tags` table. All the data in the column will be lost.
  - You are about to drop the column `repository_url` on the `project_tags` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `project_tags` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - Added the required column `image` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `experiences` DROP COLUMN `image_url`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project_tags` DROP COLUMN `demo_url`,
    DROP COLUMN `description`,
    DROP COLUMN `image_url`,
    DROP COLUMN `repository_url`,
    DROP COLUMN `title`;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `image_url`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `avatar_url`,
    ADD COLUMN `avatar` VARCHAR(191) NOT NULL;
