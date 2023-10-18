-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TRAINEE', 'COACH', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'TRAINEE';
