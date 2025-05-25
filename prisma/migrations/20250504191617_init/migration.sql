/*
  Warnings:

  - Added the required column `createdAt` to the `Tip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdatedAt` to the `Tip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tip" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastUpdatedAt" TIMESTAMP(3) NOT NULL;
