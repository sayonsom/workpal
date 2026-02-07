import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const TOTAL_BETA_SPOTS = 1500;
const REDIS_KEY = "workpal:beta_signups";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

/**
 * GET /api/beta-count
 * Returns { total, signups, remaining, percentage }
 */
export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) {
      // Fallback when Upstash is not configured
      return NextResponse.json({
        total: TOTAL_BETA_SPOTS,
        signups: 1041,
        remaining: 459,
        percentage: Math.round((1041 / TOTAL_BETA_SPOTS) * 100),
      });
    }

    const signups = ((await redis.get<number>(REDIS_KEY)) ?? 1041);
    const remaining = Math.max(0, TOTAL_BETA_SPOTS - signups);
    const percentage = Math.round((signups / TOTAL_BETA_SPOTS) * 100);

    return NextResponse.json({
      total: TOTAL_BETA_SPOTS,
      signups,
      remaining,
      percentage,
    });
  } catch {
    // On error, return sensible defaults
    return NextResponse.json({
      total: TOTAL_BETA_SPOTS,
      signups: 1041,
      remaining: 459,
      percentage: Math.round((1041 / TOTAL_BETA_SPOTS) * 100),
    });
  }
}

/**
 * POST /api/beta-count
 * Increments the signup counter by 1
 * Called after successful signup
 */
export async function POST() {
  try {
    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ success: true, remaining: 458 });
    }

    const signups = await redis.incr(REDIS_KEY);
    const remaining = Math.max(0, TOTAL_BETA_SPOTS - signups);

    return NextResponse.json({ success: true, remaining });
  } catch {
    return NextResponse.json({ success: true, remaining: 458 });
  }
}
