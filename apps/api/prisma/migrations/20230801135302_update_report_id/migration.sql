/*
  Warnings:

  - The primary key for the `ApprovedReport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reportId` on the `ApprovedReport` table. All the data in the column will be lost.
  - Added the required column `id` to the `ApprovedReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApprovedReport" DROP CONSTRAINT "ApprovedReport_reportId_fkey";

-- AlterTable
ALTER TABLE "ApprovedReport" DROP CONSTRAINT "ApprovedReport_pkey",
DROP COLUMN "reportId",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "ApprovedReport_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ApprovedReport" ADD CONSTRAINT "ApprovedReport_id_fkey" FOREIGN KEY ("id") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
