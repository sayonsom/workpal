"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type ToastVariant = "error" | "success" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  visible: boolean;
  onClose: () => void;
  autoDismissMs?: number;
}

const borderColors: Record<ToastVariant, string> = {
  error: "border-l-danger",
  success: "border-l-cta",
  info: "border-l-info",
};

const iconColors: Record<ToastVariant, string> = {
  error: "text-danger",
  success: "text-cta",
  info: "text-info",
};

export default function Toast({
  message,
  variant = "error",
  visible,
  onClose,
  autoDismissMs = 6000,
}: ToastProps) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      onClose();
    }, 180); // match --duration-normal
  }, [onClose]);

  // Auto-dismiss
  useEffect(() => {
    if (!visible || autoDismissMs <= 0) return;
    const timer = setTimeout(handleClose, autoDismissMs);
    return () => clearTimeout(timer);
  }, [visible, autoDismissMs, handleClose]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className={`fixed bottom-6 right-6 z-[9998] max-w-[380px] w-full ${
        exiting ? "toast-exit" : "toast-enter"
      }`}
      role="alert"
    >
      <div
        className={`flex items-start gap-3 bg-white rounded-[8px] border border-[var(--color-border-light)] border-l-4 ${borderColors[variant]} shadow-[var(--shadow-md)] px-4 py-3`}
      >
        <span className={`shrink-0 mt-0.5 ${iconColors[variant]}`}>
          <AlertIcon />
        </span>
        <p className="flex-1 text-[13px] text-text-primary leading-[1.4]">
          {message}
        </p>
        <button
          onClick={handleClose}
          className="shrink-0 mt-0.5 text-[var(--color-text-muted)] hover:text-text-primary transition-colors duration-[180ms] cursor-pointer"
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.body
  );
}
