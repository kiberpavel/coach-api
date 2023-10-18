import { Module } from '@nestjs/common';

import { MediaService } from './services/media.service';
import { CanvasService } from './services/canvas.service';
import { PrismaModule } from '../db/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { CanvasConfig } from './config/canvas.config';

@Module({
  imports: [PrismaModule, StorageModule],
  providers: [MediaService, CanvasService, CanvasConfig],
  exports: [MediaService, CanvasService],
})
export class MediaModule {}
