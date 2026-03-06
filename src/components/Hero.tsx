"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ReefParticles from "@/components/ReefParticles";
import CoralGlow from "@/components/CoralGlow";

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#07111f]/35 via-[#07111f]/70 to-[#07111f]" />
      <CoralGlow />
      <ReefParticles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center justify-center px-6 text-center"
      >
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[#11b5c9]">Dreamscape Aquariums</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-7xl">Living Art from the Ocean</h1>
          <p className="mt-5 text-lg text-[#eafcff]/85">A luxury underwater gallery for one-of-one WYSIWYG coral.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ y: -2 }}>
              <Link href="#" className="rounded-full bg-[#11b5c9] px-7 py-3 font-semibold text-[#07111f]">Shop Corals</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="#" className="rounded-full border border-[#eafcff]/30 px-7 py-3 font-semibold text-[#eafcff]">Explore Gallery</Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}