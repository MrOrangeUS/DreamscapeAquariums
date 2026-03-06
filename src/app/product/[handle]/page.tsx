import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";

export const revalidate = 60;

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();

  const buyUrl = "#";

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden rounded-3xl border border-[#11b5c9]/25 bg-[#0c1b2e]/60">
          <Image src={product.image || "/reef-placeholder.svg"} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>

        <div className="glass-panel rounded-3xl p-8">
          <h1 className="text-4xl font-semibold">{product.title}</h1>
          <p className="mt-5 leading-relaxed text-[#eafcff]/85">{product.description}</p>
          <p className="mt-8 text-2xl font-semibold text-[#11b5c9]">{product.price}</p>
          <Link href={buyUrl} target="_blank" className="mt-8 inline-flex rounded-full bg-[#ff7f9f] px-6 py-3 font-semibold text-[#07111f] hover:brightness-110">
            Buy on Shopify
          </Link>
        </div>
      </div>
    </main>
  );
}