/* ═══════════════════════════════════════
 * GET /api/admin/registrations
 * List all registrations (paginated, searchable)
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

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')));
  const search = searchParams.get('search') || '';
  const skip = (page - 1) * limit;

  try {
    const where = search
      ? {
          OR: [
            { twitterHandle: { contains: search, mode: 'insensitive' as const } },
            { evmAddress: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.registration.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        registrations,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (dbError) {
    console.warn('Registrations DB unavailable:', dbError);
    return NextResponse.json({
      success: true,
      data: {
        registrations: [],
        pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
      },
    });
  }
}
