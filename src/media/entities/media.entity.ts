import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field(() => ID)
  id: number;

  @HideField()
  key: string;

  @Field()
  url: string;

  @HideField()
  name: string;

  @HideField()
  mimeType?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
