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
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur transition ${
        scrolled
          ? "border-[#11b5c9]/25 bg-[#07111f]/88 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "border-[#11b5c9]/15 bg-[#07111f]/45"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="#" className="text-xs font-semibold tracking-[0.34em] text-[#eafcff]">DREAMSCAPE AQUARIUMS</Link>
        <nav className="flex items-center gap-5 text-sm text-[#eafcff]/90">
          <Link href="#" className="hover:text-[#11b5c9]">Home</Link>
          <Link href="#" className="hover:text-[#11b5c9]">Corals</Link>
          <Link href="#" className="hover:text-[#11b5c9]">About</Link>
          <Link href="#" className="hover:text-[#11b5c9]">Cart</Link>
        </nav>
      </div>
    </header>
  );
}