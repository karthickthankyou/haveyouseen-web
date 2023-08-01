-- CreateEnum
CREATE TYPE "Status" AS ENUM ('MISSING', 'FOUND_SAFE', 'FOUND_DECEASED');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('SLENDER', 'AVERAGE', 'ATHLETIC', 'HEAVY', 'OBESE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('SIGHTING', 'LEAD', 'GENERAL_INFORMATION');

-- CreateTable
CREATE TABLE "Witness" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Witness_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Officer" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "missingPersonId" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "contact" TEXT[],

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissingPerson" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT NOT NULL,
    "images" TEXT[],
    "dob" TIMESTAMP(3),
    "gender" "Gender" NOT NULL,
    "description" TEXT NOT NULL,
    "missingSince" TIMESTAMP(3),
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bodyType" "BodyType",

    CONSTRAINT "MissingPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "locationId" INTEGER,
    "type" "ReportType" NOT NULL,
    "caseId" INTEGER,
    "witnessUserId" TEXT,
    "audio" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovedReport" (
    "reportId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "officerUserId" TEXT,

    CONSTRAINT "ApprovedReport_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Case_missingPersonId_key" ON "Case"("missingPersonId");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_missingPersonId_fkey" FOREIGN KEY ("missingPersonId") REFERENCES "MissingPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_witnessUserId_fkey" FOREIGN KEY ("witnessUserId") REFERENCES "Witness"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovedReport" ADD CONSTRAINT "ApprovedReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovedReport" ADD CONSTRAINT "ApprovedReport_officerUserId_fkey" FOREIGN KEY ("officerUserId") REFERENCES "Officer"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
