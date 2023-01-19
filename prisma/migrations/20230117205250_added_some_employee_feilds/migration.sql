/*
  Warnings:

  - You are about to drop the column `LastName` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "LastName",
ADD COLUMN     "lastName" TEXT NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "userName" SET NOT NULL;
