import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { User } from '../entities/user.entity';
import { PrismaService } from '../../db/services/prisma.service';
import { CanvasService } from '../../media/services/canvas.service';
import { StorageService } from '../../storage/services/storage.service';
import { AvatarService } from './avatar.service';
import { MediaService } from '../../media/services/media.service';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly canvasService: CanvasService,
    private readonly storageService: StorageService,
    private readonly avatarService: AvatarService,
    private readonly mediaService: MediaService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(userData: Prisma.UserCreateInput): Promise<User> {
    const password = await this.passwordService.hashPassword(userData.password);

    const generatedAvatar = await this.canvasService.createAvatar(
      userData.fullName,
    );

    const uploadedAvatar = await this.storageService.uploadFile(
      generatedAvatar,
    );

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password,
      },
    });

    await this.avatarService.create(uploadedAvatar, user.id);

    return this.findOne({ id: user.id });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        avatars: true,
      },
    });

    if (!user) {
      return null;
    }

    const avatars = await this.avatarService.findUserAvatars(user.id);

    const avatar = await this.mediaService.findOne(user.selectedAvatarId);

    return { ...user, avatar, avatars };
  }

  async checkUserExists(email: string): Promise<boolean> {
    const existingUser = await this.findOne({ email });

    return !!existingUser;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: id },
      data,
    });

    return this.findOne({ id: user.id });
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<User | boolean> {
    const user = await this.findOne({ id: id });

    if (
      !(await this.passwordService.comparePassword(oldPassword, user.password))
    ) {
      return false;
    }

    const hashedPassword = await this.passwordService.hashPassword(newPassword);

    return await this.update(id, { password: hashedPassword });
  }
}
