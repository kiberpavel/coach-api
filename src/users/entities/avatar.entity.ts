import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Avatar {
  @Field(() => ID)
  id: number;

  @HideField()
  userId?: number;

  @HideField()
  mediaId?: number;

  @Field()
  url?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
