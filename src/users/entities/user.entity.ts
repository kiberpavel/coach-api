import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

import { Avatar } from './avatar.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  fullName: string;

  @HideField()
  password: string;

  @Field()
  role: Role;

  @HideField()
  selectedAvatarId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Avatar)
  avatar: Avatar;

  @Field(() => [Avatar])
  avatars: Avatar[];
}
