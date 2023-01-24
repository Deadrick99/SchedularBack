/*
  Warnings:

  - Changed the type of `roles` on the `ReleasedShift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roles` on the `ShiftType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ReleasedShift" DROP COLUMN "roles",
ADD COLUMN     "roles" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShiftType" DROP COLUMN "roles",
ADD COLUMN     "roles" INTEGER NOT NULL;
