import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { Public } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { SignInUser } from '../inputs/sign-in-user.input';
import { SignUpUser } from '../inputs/sign-up-user.input';
import { UserWithAccessToken } from '../outputs/user-with-access-token.output';
import { User } from '../../users/entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Mutation(() => UserWithAccessToken)
  async signIn(@Args('signInUser') signInUser: SignInUser) {
    const { email, password } = signInUser;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.authService.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  @Public()
  @Mutation(() => UserWithAccessToken)
  async signUp(@Args('signUpUser') signUpUser: SignUpUser) {
    const { email } = signUpUser;

    const existingUser = await this.usersService.checkUserExists(email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersService.create(signUpUser);

    const accessToken = await this.authService.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  @Query(() => User)
  async me(@CurrentUser() user: ICurrentUser) {
    return this.usersService.findOne({ email: user.email });
  }
}
