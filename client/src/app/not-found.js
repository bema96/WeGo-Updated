"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <img
          src="/Error404.png"
          alt="404"
          className="w-full max-w-[600px] h-auto opacity-50 object-contain"
        />
        <Link
          href="/"
          className="bg-[var(--sky)] py-2 px-8 rounded-full opacity-80 hover:opacity-100"
        >
          Gå tilbage
        </Link>
      </div>
    </div>
  );
}
