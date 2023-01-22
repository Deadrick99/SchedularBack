/*
  Warnings:

  - You are about to drop the column `shiftTypeId` on the `ReleasedShift` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReleasedShift" DROP CONSTRAINT "ReleasedShift_shiftTypeId_fkey";

-- AlterTable
ALTER TABLE "ReleasedShift" DROP COLUMN "shiftTypeId";
