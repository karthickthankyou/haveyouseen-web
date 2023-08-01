/*
  Warnings:

  - You are about to drop the column `officerUserId` on the `ApprovedReport` table. All the data in the column will be lost.
  - You are about to drop the column `witnessUserId` on the `Report` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApprovedReport" DROP CONSTRAINT "ApprovedReport_officerUserId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_witnessUserId_fkey";

-- AlterTable
ALTER TABLE "ApprovedReport" DROP COLUMN "officerUserId",
ADD COLUMN     "officerId" TEXT;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "witnessUserId",
ADD COLUMN     "witnessId" TEXT;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_witnessId_fkey" FOREIGN KEY ("witnessId") REFERENCES "Witness"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovedReport" ADD CONSTRAINT "ApprovedReport_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "Officer"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
