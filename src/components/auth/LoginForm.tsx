"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";
import { LOGIN, SITE } from "@/lib/constants";
import { login } from "@/lib/api";
import BetaPill from "../ui/BetaPill";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      router.push(redirect);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Workpal logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-[20px] font-bold text-text-primary">
              {SITE.nameLower}
            </span>
            <BetaPill />
          </a>
        </div>

        {/* Card */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-8">
          <h1 className="text-[24px] font-bold text-text-primary text-center">
            {LOGIN.heading}
          </h1>
          <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] text-center">
            {LOGIN.subtext}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-[13px] font-bold text-text-primary mb-1"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder={LOGIN.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-[13px] font-bold text-text-primary mb-1"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder={LOGIN.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
              />
            </div>

            {error && (
              <p className="text-[13px] text-danger font-bold">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : LOGIN.ctaLabel}
            </Button>
          </form>
        </div>

        {/* Bottom link */}
        <p className="mt-6 text-center text-[14px] text-[var(--color-text-subtle)]">
          {LOGIN.signupPrompt}{" "}
          <a
            href="/#hero-signup"
            className="text-link font-bold hover:underline"
          >
            {LOGIN.signupLink}
          </a>
        </p>
      </div>
    </div>
  );
}
