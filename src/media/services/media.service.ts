import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Media } from '../entities/media.entity';
import { PrismaService } from '../../db/services/prisma.service';
import { StorageService } from '../../storage/services/storage.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(data: Prisma.MediaCreateInput): Promise<Media> {
    const media = await this.prisma.media.create({ data });

    return this.findOne(media.id);
  }

  async findOne(id: number): Promise<Media> {
    const media = await this.prisma.media.findUnique({
      where: {
        id,
      },
    });

    const url = await this.storageService.getFileUrl(media.key);

    return { ...media, url };
  }
}
