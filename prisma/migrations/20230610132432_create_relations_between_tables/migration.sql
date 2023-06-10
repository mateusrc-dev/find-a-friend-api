/*
  Warnings:

  - The `photos` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `requirements` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "org_id" TEXT NOT NULL,
DROP COLUMN "photos",
ADD COLUMN     "photos" TEXT[],
DROP COLUMN "requirements",
ADD COLUMN     "requirements" TEXT[];

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
