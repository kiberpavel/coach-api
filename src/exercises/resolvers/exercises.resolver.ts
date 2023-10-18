import { Resolver } from '@nestjs/graphql';
import { Role } from '@prisma/client';

import { Roles } from '../../auth/decorators/roles.decorator';

@Resolver()
export class ExercisesResolver {
  @Roles(Role.ADMIN)
  getAll() {
    // TODO
  }

  getAllBy() {
    // TODO
  }

  getBy() {
    // TODO
  }

  @Roles(Role.ADMIN)
  create() {
    // TODO
  }

  @Roles(Role.ADMIN)
  update() {
    // TODO
  }

  @Roles(Role.ADMIN)
  delete() {
    // TODO
  }
}
