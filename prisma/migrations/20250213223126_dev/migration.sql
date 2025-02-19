/*
  Warnings:

  - You are about to drop the `DataBase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DataBase" DROP CONSTRAINT "DataBase_user_id_fkey";

-- DropTable
DROP TABLE "DataBase";

-- CreateTable
CREATE TABLE "Database" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "connectionString" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Database_user_id_idx" ON "Database"("user_id");

-- AddForeignKey
ALTER TABLE "Database" ADD CONSTRAINT "Database_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
