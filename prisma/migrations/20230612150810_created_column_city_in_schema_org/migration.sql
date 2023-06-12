/*
  Warnings:

  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "city" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Energy";

-- DropEnum
DROP TYPE "Environment";

-- DropEnum
DROP TYPE "Independence";

-- DropEnum
DROP TYPE "Size";
