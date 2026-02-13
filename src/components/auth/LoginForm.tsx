"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";
import { LOGIN, SITE } from "@/lib/constants";
import { login, forgotPassword } from "@/lib/api";


function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6.5 3.2A7.5 7.5 0 0115 8c-.5 1-1.4 2.4-2.8 3.5M9.9 9.9A2 2 0 016.1 6.1M1 8s2.5-5 7-5M1 1l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/inbox";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot password flow
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");

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

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");

    if (!forgotEmail) {
      setForgotError("Please enter your email address.");
      return;
    }

    setForgotLoading(true);
    try {
      await forgotPassword(forgotEmail);
      setForgotMessage("If an account exists with that email, we've sent a reset link.");
    } catch (err) {
      setForgotError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setForgotLoading(false);
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
          </a>
        </div>

        {/* Card */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-8">
          {showForgot ? (
            <>
              <h1 className="text-[24px] font-bold text-text-primary text-center">
                Forgot Password
              </h1>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] text-center">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    placeholder={LOGIN.emailPlaceholder}
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                    className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
                  />
                </div>

                {forgotError && (
                  <p className="text-[13px] text-danger font-bold">{forgotError}</p>
                )}

                {forgotMessage && (
                  <div className="rounded-[6px] bg-[#dcfce7] border border-cta/20 px-3 py-2">
                    <p className="text-[13px] text-cta font-bold">{forgotMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={forgotLoading}
                >
                  {forgotLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <button
                onClick={() => {
                  setShowForgot(false);
                  setForgotError("");
                  setForgotMessage("");
                }}
                className="mt-4 w-full text-center text-[13px] text-link font-bold hover:underline cursor-pointer"
              >
                Back to login
              </button>
            </>
          ) : (
            <>
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
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="login-password"
                      className="block text-[13px] font-bold text-text-primary"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(true);
                        setForgotEmail(email);
                      }}
                      className="text-[12px] text-link font-bold hover:underline cursor-pointer"
                    >
                      {LOGIN.forgotPassword}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={LOGIN.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="w-full h-11 px-3 pr-10 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-text-primary transition-colors cursor-pointer"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
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
            </>
          )}
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
