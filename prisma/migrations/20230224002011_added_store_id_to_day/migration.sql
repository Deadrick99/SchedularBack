-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "storeId" TEXT;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
