import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './env';
import { PrismaClient } from './generated/prisma/client';

const connectionString = `${env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
export const custom_prisma = new PrismaClient({ adapter });
