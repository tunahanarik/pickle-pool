/* ═══════════════════════════════════════
 * Prisma Client — Lazy Singleton
 * Only creates the client when first accessed (not at build time)
 * ═══════════════════════════════════════ */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { _prisma?: PrismaClient };

function getPrisma(): PrismaClient {
  if (!globalForPrisma._prisma) {
    globalForPrisma._prisma = new PrismaClient();
  }
  return globalForPrisma._prisma;
}

export default {
  get registration() {
    return getPrisma().registration;
  },
  get questConfig() {
    return getPrisma().questConfig;
  },
  get $connect() {
    return getPrisma().$connect.bind(getPrisma());
  },
  get $disconnect() {
    return getPrisma().$disconnect.bind(getPrisma());
  },
} as unknown as PrismaClient;
