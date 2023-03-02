-- AlterTable
ALTER TABLE "ShiftType" ADD COLUMN     "storeId" TEXT;

-- AddForeignKey
ALTER TABLE "ShiftType" ADD CONSTRAINT "ShiftType_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
