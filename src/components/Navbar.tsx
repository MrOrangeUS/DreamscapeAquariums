"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] text-white">
          DREAMSCAPE
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-white/80 transition hover:text-cyan-300">
            Home
          </Link>
          <Link href="/products" className="text-sm text-white/80 transition hover:text-cyan-300">
            Corals
          </Link>
          <Link href="/about" className="text-sm text-white/80 transition hover:text-cyan-300">
            About
          </Link>
          <Link href="/cart" className="text-sm text-white/80 transition hover:text-cyan-300">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
