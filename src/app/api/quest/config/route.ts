/* ═══════════════════════════════════════
 * GET/PUT /api/quest/config
 * Quest task links — configurable from admin
 * With in-memory fallback when DB is unavailable
 * ═══════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pickle-admin-2026';

const DEFAULT_CONFIG: Record<string, string> = {
  follow_url: 'https://x.com/Picklepool_io',
  like_url: 'https://x.com/Picklepool_io/status/PLACEHOLDER',
  repost_url: 'https://x.com/Picklepool_io/status/PLACEHOLDER',
  comment_url: 'https://x.com/Picklepool_io/status/PLACEHOLDER',
  follow_label: 'Follow @Picklepool_io',
  follow_description: 'Turn on notifications 🔔',
  like_label: 'Like Our Post',
  like_description: 'Show some love 💚',
  repost_label: 'Repost Announcement',
  repost_description: 'Spread the word 🥒',
  comment_label: 'Comment on Post',
  comment_description: 'Drop your wallet and tag your friends 🫡',
  qrt_template: '🥒 Just registered for @Picklepool_io FREE NFT Quest!\n\nComplete the quests and secure your spot for the mint 🔥\n\nDon\'t miss out 👇',
  qrt_url: 'https://x.com/Picklepool_io/status/PLACEHOLDER',
};

// In-memory config store (used when DB is unavailable)
let memoryConfig: Record<string, string> = { ...DEFAULT_CONFIG };

export async function GET() {
  try {
    const configs = await prisma.questConfig.findMany();

    // Merge defaults with DB values
    const result = { ...DEFAULT_CONFIG };
    for (const config of configs) {
      result[config.key] = config.value;
    }

    return NextResponse.json({ success: true, data: result });
  } catch {
    // DB unavailable — return in-memory config
    return NextResponse.json({ success: true, data: memoryConfig });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const password = request.headers.get('x-admin-password');
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Try DB first
    try {
      const updates = Object.entries(body).map(([key, value]) =>
        prisma.questConfig.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      );
      await Promise.all(updates);
    } catch {
      // DB unavailable — save to in-memory store
      console.warn('Config DB unavailable, saving to memory');
    }

    // Always update in-memory store
    for (const [key, value] of Object.entries(body)) {
      memoryConfig[key] = String(value);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Config update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update config' },
      { status: 500 }
    );
  }
}
