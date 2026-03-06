"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/20 bg-[#07111f]/80 shadow-[0_12px_35px_rgba(0,0,0,.35)]"
          : "border-white/10 bg-[#07111f]/35"
      } backdrop-blur-xl`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.35em] text-[#eafcff]">
          DREAMSCAPE AQUARIUMS
        </Link>

        <nav className="flex items-center gap-6 text-sm text-[#eafcff]/85">
          <Link className="transition hover:text-[#11b5c9]" href="/">Home</Link>
          <Link className="transition hover:text-[#11b5c9]" href="/products">Corals</Link>
          <Link className="transition hover:text-[#11b5c9]" href="/about">About</Link>
          <Link className="transition hover:text-[#11b5c9]" href="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
