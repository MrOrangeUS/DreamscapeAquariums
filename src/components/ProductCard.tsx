"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/shopify";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -8 }} className="group overflow-hidden rounded-3xl border border-[#11b5c9]/20 bg-[#0c1b2e]/65 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={product.image || "/reef-placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-[#11b5c9]/45 bg-[#07111f]/65 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#11b5c9]">WYSIWYG</span>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="text-[#11b5c9]">{product.price}</p>
        <Link href="#"`} className="inline-flex rounded-full border border-[#ff7f9f]/45 bg-[#ff7f9f]/15 px-4 py-2 text-sm text-[#ffd9e3] hover:bg-[#ff7f9f]/30">
          View Coral
        </Link>
      </div>
    </motion.article>
  );
}