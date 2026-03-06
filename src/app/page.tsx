import Hero from "@/components/Hero";
import CountdownTimer from "@/components/CountdownTimer";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCollection } from "@/lib/shopify";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getProductsByCollection("new-arrivals", 6);
  const coralDropDate = process.env.CORAL_DROP_DATE || new Date(Date.now() + 86400000).toISOString();

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="glass-panel rounded-3xl p-8 shadow-[0_0_40px_rgba(17,181,201,0.12)]">
          <h2 className="text-3xl font-semibold">Next Coral Drop</h2>
          <div className="mt-6">
            <CountdownTimer targetDate={coralDropDate} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-7 text-3xl font-semibold">Live Coral Collection</h2>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}