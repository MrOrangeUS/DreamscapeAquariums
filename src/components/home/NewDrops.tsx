import CoralCard from "@/components/home/CoralCard";
import { getProductsFromCollection } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function NewDrops() {
  const products = await getProductsFromCollection("new-arrivals-sorted-newest-first", 3);

  // Step 4 temporary debug log for feed verification
  console.log(products);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">New Coral Drops</h2>
        <p className="text-sm text-cyan-200">Live from Shopify</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <CoralCard
            key={product.id}
            title={product.title}
            handle={product.handle}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}
