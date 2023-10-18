import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { AvatarService } from './services/avatar.service';
import { MediaModule } from '../media/media.module';
import { PasswordService } from './services/password.service';
import { StorageModule } from '../storage/storage.module';
import { PrismaModule } from '../db/prisma.module';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [PrismaModule, MediaModule, StorageModule],
  providers: [UsersService, AvatarService, PasswordService, UsersResolver],
  exports: [UsersService, AvatarService, PasswordService],
})
export class UsersModule {}
