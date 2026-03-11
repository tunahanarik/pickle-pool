/* ═══════════════════════════════════════
 * Prisma Client — Singleton
 * ═══════════════════════════════════════ */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { _prisma?: PrismaClient };

if (!globalForPrisma._prisma) {
  globalForPrisma._prisma = new PrismaClient();
}

const prisma: PrismaClient = globalForPrisma._prisma;

export default prisma;
