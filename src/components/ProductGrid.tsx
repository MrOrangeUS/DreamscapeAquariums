import type { Product } from "../lib/shopify";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
