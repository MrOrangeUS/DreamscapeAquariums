"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: `${5 + i * 5}%`,
  size: 4 + (i % 4) * 3,
  duration: 10 + (i % 5) * 3,
  delay: (i % 6) * 0.8,
}));

export default function ReefParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute bottom-[-20px] rounded-full bg-[#eafcff]/25"
          style={{ left: p.left, width: p.size, height: p.size }}
          animate={{ y: [-10, -700], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}