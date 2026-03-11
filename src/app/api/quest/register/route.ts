/* ═══════════════════════════════════════
 * POST /api/quest/register
 * Register a new quest participant
 * ═══════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

// Simple rate limiting store (per-process, clears on restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;       // max requests
const RATE_WINDOW = 60_000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { twitterHandle, evmAddress, completedQuests } = body;

    // Validation
    if (!twitterHandle || typeof twitterHandle !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Twitter username is required.' },
        { status: 400 }
      );
    }

    const cleanHandle = twitterHandle.replace(/^@/, '').trim().toLowerCase();
    if (cleanHandle.length < 1 || cleanHandle.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Invalid Twitter username.' },
        { status: 400 }
      );
    }

    if (!evmAddress || typeof evmAddress !== 'string') {
      return NextResponse.json(
        { success: false, error: 'EVM wallet address is required.' },
        { status: 400 }
      );
    }

    const cleanAddress = evmAddress.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(cleanAddress)) {
      return NextResponse.json(
        { success: false, error: 'Invalid EVM wallet address. Must start with 0x and be 42 characters.' },
        { status: 400 }
      );
    }

    // Check for duplicate twitter handle
    const existingByHandle = await prisma.registration.findUnique({
      where: { twitterHandle: cleanHandle },
    });

    if (existingByHandle) {
      return NextResponse.json(
        { success: false, error: 'This Twitter username has already been registered.' },
        { status: 409 }
      );
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        twitterHandle: cleanHandle,
        evmAddress: cleanAddress,
        completedQuests: completedQuests || [],
        ipAddress: ip,
      },
    });

    return NextResponse.json({
      success: true,
      data: { id: registration.id },
    });
  } catch (error: unknown) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
