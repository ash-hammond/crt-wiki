/*
  Warnings:

  - You are about to drop the column `name` on the `CRT` table. All the data in the column will be lost.
  - Made the column `model` on table `CRT` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CRT" DROP COLUMN "name",
ALTER COLUMN "model" SET NOT NULL;
