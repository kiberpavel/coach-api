import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { UsersService } from '../../users/services/users.service';
import { PasswordService } from '../../users/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (
      user &&
      (await this.passwordService.comparePassword(password, user.password))
    ) {
      const { password, ...userData } = user;

      return userData;
    }

    return null;
  }

  async generateAccessToken(user: User) {
    const payload = {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
