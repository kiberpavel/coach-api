import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../users/entities/user.entity';

@ObjectType()
export class UserWithAccessToken {
  @Field()
  user: User;

  @Field()
  accessToken: string;
}
