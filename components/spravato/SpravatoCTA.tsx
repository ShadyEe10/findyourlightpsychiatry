"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Sticky call-to-action bar with quick links for the SPRAVATO® page.
 */
export default function SpravatoCTA() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.15)] backdrop-blur sm:w-auto sm:min-w-[560px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-700/80">
            Ready to begin?
          </p>
          <p className="text-base font-semibold text-slate-900">
            Request your SPRAVATO® consultation today.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact?service=spravato"
            className="rounded-2xl bg-[#059669] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_25px_rgba(5,150,105,0.28)] transition hover:bg-[#047857]"
          >
            Request Consultation
          </Link>
          <Link
            href="/contact?service=spravato&inquiry=insurance"
            className="rounded-2xl border-2 border-[#059669] px-6 py-3 text-center text-sm font-semibold text-[#059669] transition hover:bg-[#059669] hover:text-white"
          >
            Verify Insurance
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
        aria-label="Dismiss SPRAVATO call-to-action"
      >
        ×
      </button>
    </div>
  );
}

