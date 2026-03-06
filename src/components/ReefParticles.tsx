"use client";
import { motion } from "framer-motion";
const particles = Array.from({ length: 18 }, (_, i) => ({ id: i, size: 3 + (i % 4) * 2, left: `${(i * 17) % 100}%`, duration: 10 + (i % 5) * 2, delay: i * .35 }));

export default function ReefParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span key={p.id} className="absolute bottom-[-10%] rounded-full bg-[#11b5c9]/40" style={{ width: p.size, height: p.size, left: p.left }} animate={{ y: [0, -900], opacity: [0, .8, 0] }} transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }} />
      ))}
    </div>
  );
}
