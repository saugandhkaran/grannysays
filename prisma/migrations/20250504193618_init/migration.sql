/*
  Warnings:

  - Added the required column `updatedAt` to the `GrannySaying` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GrannySaying" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tip" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
