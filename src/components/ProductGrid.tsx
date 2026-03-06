import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/shopify";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <p className="rounded-2xl border border-[#ff7f9f]/30 bg-[#0c1b2e]/70 p-6 text-[#eafcff]/85">No products available right now.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}