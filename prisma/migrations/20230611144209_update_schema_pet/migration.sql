/*
  Warnings:

  - The `size` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energyLevel` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `independenceLevel` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `environment` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'AVERAGE', 'BIG');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('LOW', 'AVERAGE', 'HIGH');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('LOW', 'AVERAGE', 'HIGH');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('SMALL', 'AVERAGE', 'WIDE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL DEFAULT 'AVERAGE',
DROP COLUMN "energyLevel",
ADD COLUMN     "energyLevel" "Energy" NOT NULL DEFAULT 'AVERAGE',
DROP COLUMN "independenceLevel",
ADD COLUMN     "independenceLevel" "Independence" NOT NULL DEFAULT 'AVERAGE',
DROP COLUMN "environment",
ADD COLUMN     "environment" "Environment" NOT NULL DEFAULT 'AVERAGE';
