/*
  Warnings:

  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userId",
ADD COLUMN     "referrer_id" INTEGER,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'admin';
