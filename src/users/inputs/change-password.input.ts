import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @IsNotEmpty()
  @Field()
  @MinLength(6)
  oldPassword: string;

  @IsNotEmpty()
  @Field()
  @MinLength(6)
  newPassword: string;
}
