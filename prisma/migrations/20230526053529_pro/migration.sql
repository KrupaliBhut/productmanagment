/*
  Warnings:

  - You are about to alter the column `productId` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `productId` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `productId` on the `ProductCategory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `categoryId` on the `ProductCategory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductCategory` DROP FOREIGN KEY `ProductCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductCategory` DROP FOREIGN KEY `ProductCategory_productId_fkey`;

-- AlterTable
ALTER TABLE `Cart` MODIFY `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Image` MODIFY `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ProductCategory` DROP PRIMARY KEY,
    MODIFY `productId` INTEGER NOT NULL,
    MODIFY `categoryId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`productId`, `categoryId`);

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
