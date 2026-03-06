import Image from "next/image";
import Link from "next/link";
import { getProductByHandle } from "../../../lib/shopify";

interface Props {
  params: { handle: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return <main className="mx-auto max-w-5xl px-6 py-16 text-[#eafcff]">Product not found.</main>;
  }

  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const buyUrl = domain ? `https://${domain}/products/${product.handle}` : "#";

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10">
          <Image src={product.image} alt={product.title} fill className="object-cover" />
        </div>

        <div className="ocean-panel rounded-3xl p-8">
          <h1 className="text-4xl font-semibold text-[#eafcff]">{product.title}</h1>
          <p className="mt-4 text-[#eafcff]/70">{product.description}</p>
          <p className="mt-8 text-2xl font-medium text-[#11b5c9]">{product.price}</p>

          <Link
            href={buyUrl}
            target="_blank"
            className="mt-8 inline-flex rounded-full border border-[#11b5c9]/40 bg-[#11b5c9]/15 px-6 py-3 text-sm font-semibold text-[#eafcff] transition hover:bg-[#11b5c9]/30"
          >
            Buy on Shopify
          </Link>
        </div>
      </div>
    </main>
  );
}
