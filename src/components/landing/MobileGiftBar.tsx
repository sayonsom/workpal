"use client";

import { useState } from "react";
import { GIFT_WORKPAL } from "@/lib/constants";

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function MobileGiftBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-cta text-white px-4 py-3 flex items-center justify-between shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
        <a
          href="/#gift"
          className="text-[13px] font-bold text-white flex-1"
        >
          {GIFT_WORKPAL.mobileBar}
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 ml-3 p-1 rounded-full hover:bg-white/20 transition-colors duration-[180ms] cursor-pointer"
          aria-label="Dismiss gift bar"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
