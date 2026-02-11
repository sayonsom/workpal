import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Routes that require authentication */
const PROTECTED = ["/inbox", "/settings", "/admin"];

/** Routes that authenticated users should skip (redirect to inbox) */
const AUTH_PAGES = ["/login"];

/** Landing page — redirect authed users to inbox */
const LANDING = ["/"];

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

  // Auth pages — redirect to inbox if already authenticated
  if (AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    if (hasAuth) {
      return NextResponse.redirect(new URL("/inbox", request.url));
    }
  }

  // Landing page — redirect authed users to inbox
  if (LANDING.some((p) => pathname === p)) {
    if (hasAuth) {
      return NextResponse.redirect(new URL("/inbox", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/inbox/:path*", "/settings/:path*", "/admin/:path*", "/login", "/"],
};
