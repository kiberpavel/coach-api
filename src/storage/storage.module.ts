import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StorageService } from './services/storage.service';
import { StorageConfig } from './config/storage.config';

@Module({
  imports: [ConfigModule],
  providers: [StorageConfig, StorageService],
  exports: [StorageService],
})
export class StorageModule {}
