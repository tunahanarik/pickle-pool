/* ═══════════════════════════════════════
 * Prisma Client — Lazy Singleton
 * Prevents build-time connection attempts
 * ═══════════════════════════════════════ */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { _prisma?: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma._prisma) {
    globalForPrisma._prisma = new PrismaClient();
  }
  return globalForPrisma._prisma;
}

// Export a proxy that lazily initializes PrismaClient on first use
const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getPrismaClient();
    const value = client[prop as keyof PrismaClient];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

export default prisma;
