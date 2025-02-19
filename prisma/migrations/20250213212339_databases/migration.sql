-- CreateTable
CREATE TABLE "DataBase" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "connectionString" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "DataBase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DataBase_user_id_idx" ON "DataBase"("user_id");

-- AddForeignKey
ALTER TABLE "DataBase" ADD CONSTRAINT "DataBase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
