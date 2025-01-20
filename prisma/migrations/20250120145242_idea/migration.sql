-- CreateTable
CREATE TABLE "IdeaHistory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "IdeaHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IdeaHistory_user_id_idx" ON "IdeaHistory"("user_id");

-- AddForeignKey
ALTER TABLE "IdeaHistory" ADD CONSTRAINT "IdeaHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
