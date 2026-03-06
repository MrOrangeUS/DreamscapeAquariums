"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  size: 3 + (index % 4) * 2,
  left: `${(index * 17) % 100}%`,
  duration: 10 + (index % 5) * 2,
  delay: index * 0.35,
}));

export default function ReefParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute bottom-[-10%] rounded-full bg-[#11b5c9]/40"
          style={{ width: particle.size, height: particle.size, left: particle.left }}
          animate={{ y: [0, -900], opacity: [0, 0.8, 0] }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: "linear", delay: particle.delay }}
        />
      ))}
    </div>
  );
}
