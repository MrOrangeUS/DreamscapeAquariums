import Hero from "../components/Hero";
import CountdownTimer from "../components/CountdownTimer";
import ProductGrid from "../components/ProductGrid";
import CoralGlow from "../components/CoralGlow";
import { getProductsByCollection } from "../lib/shopify";

export default async function HomePage() {
  const products = await getProductsByCollection("new-arrivals");
  const targetDate = process.env.CORAL_DROP_DATE || "";

  return (
    <main className="relative overflow-hidden">
      <CoralGlow />
      <Hero />
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-5 text-center text-3xl font-semibold text-[#eafcff] md:text-5xl">Next Coral Drop</h2>
        <CountdownTimer targetDate={targetDate} />
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold text-[#eafcff] md:text-5xl">New Arrivals</h2>
          <p className="max-w-lg text-sm text-[#eafcff]/65">Luxury frags and reef collectibles, presented as living art.</p>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
