import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Routes that require authentication */
const PROTECTED = ["/dashboard", "/settings"];

/** Routes that authenticated users should skip (redirect to dashboard) */
const AUTH_PAGES = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuth = request.cookies.get("auth")?.value === "1";

  // Protected routes — redirect to login if no auth cookie
  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    if (!hasAuth) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Auth pages — redirect to dashboard if already authenticated
  if (AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    if (hasAuth) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/login"],
};
