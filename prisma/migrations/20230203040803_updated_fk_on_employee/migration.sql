/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Store` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "storeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "employeeId";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
