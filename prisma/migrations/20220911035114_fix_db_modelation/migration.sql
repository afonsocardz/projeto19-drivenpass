/*
  Warnings:

  - You are about to drop the `credential_names` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "credential_names" DROP CONSTRAINT "credential_names_credentialId_fkey";

-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "credential_names";
