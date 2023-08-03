/*
  Warnings:

  - Made the column `officerId` on table `ApprovedReport` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ApprovedReport" DROP CONSTRAINT "ApprovedReport_officerId_fkey";

-- AlterTable
ALTER TABLE "ApprovedReport" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "officerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ApprovedReport" ADD CONSTRAINT "ApprovedReport_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "Officer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
