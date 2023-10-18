import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../../auth/interfaces/current-user.interface';
import { ChangePasswordInput } from '../inputs/change-password.input';
import { UsersService } from '../services/users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async updatePassword(
    @CurrentUser() user: ICurrentUser,
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    const { oldPassword, newPassword } = changePasswordInput;

    const updatedUser = this.usersService.changePassword(
      user.id,
      oldPassword,
      newPassword,
    );

    if (!updatedUser) {
      throw new BadRequestException('User password is incorrect');
    }

    return updatedUser;
  }
}
