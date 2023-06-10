/*
  Warnings:

  - You are about to drop the `org` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "org";

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energyLevel" TEXT NOT NULL,
    "independenceLevel" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
