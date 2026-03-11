/* ═══════════════════════════════════════
 * GET /api/admin/stats
 * Dashboard statistics
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalRegistrations, todayRegistrations] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({
        where: { createdAt: { gte: today } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalRegistrations,
        todayRegistrations,
      },
    });
  } catch (dbError) {
    // DB unavailable — return zero stats (admin still works for config)
    console.warn('Stats DB unavailable:', dbError);
    return NextResponse.json({
      success: true,
      data: {
        totalRegistrations: 0,
        todayRegistrations: 0,
      },
    });
  }
}
