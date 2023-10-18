/*
  Warnings:

  - A unique constraint covering the columns `[selected_avatar_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "selected_avatar_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_selected_avatar_id_key" ON "users"("selected_avatar_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_selected_avatar_id_fkey" FOREIGN KEY ("selected_avatar_id") REFERENCES "users_avatars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
