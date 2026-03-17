/* ═══════════════════════════════════════
 * GET /api/admin/registrations
 * List all registrations (paginated, searchable)
 * Groups by twitterHandle and shows entry count
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

    // Count how many times each twitterHandle has registered
    const handleCounts = new Map<string, number>();
    const allHandles = registrations.map((r) => r.twitterHandle);
    
    if (allHandles.length > 0) {
      // Get counts for all handles in this page
      const uniqueHandles = [...new Set(allHandles)];
      const counts = await Promise.all(
        uniqueHandles.map(async (handle) => {
          const count = await prisma.registration.count({
            where: { twitterHandle: handle },
          });
          return { handle, count };
        })
      );
      counts.forEach(({ handle, count }) => handleCounts.set(handle, count));
    }

    // Attach entryCount to each registration
    const enrichedRegistrations = registrations.map((reg) => ({
      ...reg,
      entryCount: handleCounts.get(reg.twitterHandle) || 1,
    }));

    return NextResponse.json({
      success: true,
      data: {
        registrations: enrichedRegistrations,
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
