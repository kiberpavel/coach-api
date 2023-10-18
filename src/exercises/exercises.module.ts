import { Module } from '@nestjs/common';

import { ExercisesResolver } from './resolvers/exercises.resolver';

@Module({
  providers: [ExercisesResolver],
})
export class ExercisesModule {}
