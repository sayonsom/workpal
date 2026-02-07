/* ═══════════════════════════════════════════════
   Token management — localStorage + cookie flag
   ═══════════════════════════════════════════════ */

const ACCESS_KEY = "workpal_access_token";
const REFRESH_KEY = "workpal_refresh_token";
const COOKIE_NAME = "auth";

/** Store both tokens in localStorage and set an auth cookie flag for middleware */
export function saveTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  // Set a simple flag cookie so Next.js middleware can detect auth.
  // The actual token validation happens client-side.
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

/** Update only the access token (after refresh) */
export function saveAccessToken(accessToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, accessToken);
}

/** Get the current access token */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

/** Get the current refresh token */
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

/** Clear all auth state — tokens + cookie */
export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

/** Quick check: is an access token present? */
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
