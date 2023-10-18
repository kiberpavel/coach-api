import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { PrismaService } from './db/services/prisma.service';

const port = process.env.API_PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await setupPrisma(app);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
}
bootstrap();

async function setupPrisma(app: INestApplication) {
  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);
}
