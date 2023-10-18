import { Role } from '@prisma/client';

export interface IJwtPayload {
  fullName: string;
  email: string;
  role: Role[];
  sub: number;
  iat: number;
  exp: number;
}
