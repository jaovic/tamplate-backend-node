/*
  Warnings:

  - You are about to alter the column `codeSms` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "token" DROP DEFAULT,
ALTER COLUMN "Refresh_Token" DROP NOT NULL,
ALTER COLUMN "Refresh_Token" DROP DEFAULT,
ALTER COLUMN "codeSms" DROP NOT NULL,
ALTER COLUMN "codeSms" DROP DEFAULT,
ALTER COLUMN "codeSms" SET DATA TYPE VARCHAR(20);
