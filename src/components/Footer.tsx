import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#07111f]/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="text-sm tracking-[0.2em] text-[#eafcff]/80">DREAMSCAPE AQUARIUMS</p>
        <nav className="flex items-center gap-5 text-sm text-[#eafcff]/65">
          <Link href="/">Home</Link><Link href="/products">Corals</Link><Link href="/about">About</Link><Link href="/cart">Cart</Link>
        </nav>
        <p className="text-xs text-[#eafcff]/45">© {new Date().getFullYear()} Dreamscape Aquariums</p>
      </div>
    </footer>
  );
}
