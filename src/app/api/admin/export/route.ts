/* ═══════════════════════════════════════
 * GET /api/admin/export
 * Export all registrations as CSV
 * ═══════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pickle-admin-2026';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Build CSV
    const headers = ['ID', 'Twitter Handle', 'EVM Address', 'Completed Quests', 'IP Address', 'Registered At'];
    const rows = registrations.map((r: { id: number; twitterHandle: string; evmAddress: string; completedQuests: unknown; ipAddress: string | null; createdAt: Date }) => [
      r.id,
      `@${r.twitterHandle}`,
      r.evmAddress,
      JSON.stringify(r.completedQuests),
      r.ipAddress || '',
      r.createdAt.toISOString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row: (string | number)[]) => row.map((v: string | number) => `"${String(v).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="pickle-pool-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (dbError) {
    console.warn('Export DB unavailable:', dbError);
    const headers = ['ID', 'Twitter Handle', 'EVM Address', 'Completed Quests', 'IP Address', 'Registered At'];
    return new NextResponse(headers.join(',') + '\n', {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="pickle-pool-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }
}
