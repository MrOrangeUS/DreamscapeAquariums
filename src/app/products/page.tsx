import ProductGrid from "@/components/ProductGrid";
import { getProductsByCollection } from "@/lib/shopify";

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProductsByCollection("new-arrivals", 18);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-semibold">Coral Gallery</h1>
      <ProductGrid products={products} />
    </main>
  );
}