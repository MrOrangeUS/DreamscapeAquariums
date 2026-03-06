"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ReefParticles from "./ReefParticles";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#07111f]/40 via-[#07111f]/55 to-[#07111f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,181,201,.2),transparent_55%)]" />
      <ReefParticles />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: "easeOut" }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.5em] text-[#eafcff]/80">Dreamscape Aquariums</p>
        <h1 className="text-5xl font-semibold leading-tight text-[#eafcff] md:text-7xl">Living Art from the Ocean</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#eafcff]/80">A cinematic reef gallery where every coral is curated like a one-of-one masterpiece.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/products" className="rounded-full border border-[#11b5c9]/50 bg-[#11b5c9]/95 px-7 py-3 font-medium text-[#07111f] shadow-[0_0_30px_rgba(17,181,201,.45)] transition hover:-translate-y-0.5">Shop Corals</Link>
          <Link href="/about" className="rounded-full border border-white/25 bg-white/8 px-7 py-3 font-medium text-[#eafcff] transition hover:bg-white/14">Explore Gallery</Link>
        </div>
      </motion.div>
    </section>
  );
}
