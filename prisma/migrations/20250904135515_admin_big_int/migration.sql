/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "discordId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("discordId");
