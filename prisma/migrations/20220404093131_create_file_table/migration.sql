/*
  Warnings:

  - Added the required column `boardId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `boardId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
