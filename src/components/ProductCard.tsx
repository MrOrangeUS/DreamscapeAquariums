"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "../lib/shopify";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 shadow-[0_18px_45px_rgba(0,0,0,.3)] backdrop-blur-lg">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={product.image || "https://cdn.shopify.com/s/files/1/0000/0001/files/placeholder.jpg"}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-[#11b5c9]/40 bg-[#07111f]/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#11b5c9]">
          WYSIWYG
        </span>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-[#eafcff]">{product.title}</h3>
          <p className="mt-1 text-sm text-[#eafcff]/65">{product.price}</p>
        </div>

        <Link
          href={`/product/${product.handle}`}
          className="inline-flex rounded-full border border-[#ff7f9f]/45 bg-[#ff7f9f]/15 px-4 py-2 text-sm font-medium text-[#ffd8e4] transition hover:bg-[#ff7f9f]/30"
        >
          View Coral
        </Link>
      </div>
    </motion.article>
  );
}
