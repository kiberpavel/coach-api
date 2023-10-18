-- AddForeignKey
ALTER TABLE "users_avatars" ADD CONSTRAINT "users_avatars_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
