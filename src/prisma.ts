import { PrismaPg } from '@prisma/adapter-pg';
import { server_env } from './env.js';
import { PrismaClient } from './generated/prisma/client.js';

const connectionString = `${server_env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
export const custom_prisma = new PrismaClient({ adapter });
