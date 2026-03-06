import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#11b5c9]/20 bg-[#07111f]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="text-xs tracking-[0.28em] text-[#eafcff]/80">DREAMSCAPE AQUARIUMS</p>
        <div className="flex gap-4 text-sm text-[#eafcff]/75">
          <Link href="#">Home</Link>
          <Link href="#">Corals</Link>
          <Link href="#">About</Link>
          <Link href="#">Cart</Link>
        </div>
        <p className="text-xs text-[#eafcff]/50">Â© {new Date().getFullYear()} Dreamscape Aquariums</p>
      </div>
    </footer>
  );
}