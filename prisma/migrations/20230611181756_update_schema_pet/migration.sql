/*
  Warnings:

  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energyLevel` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independenceLevel` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "energyLevel",
ADD COLUMN     "energyLevel" TEXT NOT NULL,
DROP COLUMN "independenceLevel",
ADD COLUMN     "independenceLevel" TEXT NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" TEXT NOT NULL;
