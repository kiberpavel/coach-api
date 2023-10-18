import { Injectable } from '@nestjs/common';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';

import { Avatar } from '../entities/avatar.entity';
import { FileName } from '../../media/constants/file-name.constants';
import { MediaService } from '../../media/services/media.service';
import { StorageService } from '../../storage/services/storage.service';
import { PrismaService } from '../../db/services/prisma.service';

@Injectable()
export class AvatarService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaService: MediaService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    uploadedAvatar: PutObjectCommandInput,
    userId: number,
  ): Promise<Avatar> {
    // TODO Rewrite for one call in a complex object
    return this.prisma.$transaction(async (prismaClient) => {
      const media = await this.mediaService.create({
        key: uploadedAvatar.Key,
        name: `${FileName.Avatar}.png`,
        mimeType: uploadedAvatar.ContentType,
      });

      const usersAvatar = await prismaClient.userAvatar.create({
        data: {
          userId: userId,
          mediaId: media.id,
        },
      });

      await prismaClient.user.update({
        where: { id: userId },
        data: {
          selectedAvatarId: media.id,
        },
      });

      return usersAvatar;
    });
  }

  async findOne(id: number): Promise<Avatar> {
    return this.prisma.userAvatar.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserAvatars(userId: number): Promise<Array<Avatar>> {
    const userAvatars = await this.prisma.userAvatar.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        media: {
          select: {
            key: true,
          },
        },
      },
    });

    return Promise.all(
      userAvatars.map(async ({ media, ...avatar }) => {
        const { key } = media;

        const url = await this.storageService.getFileUrl(key);

        return { url, ...avatar };
      }),
    );
  }
}
