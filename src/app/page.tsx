import Hero from "../components/Hero";
import CountdownTimer from "../components/CountdownTimer";
import ProductGrid from "../components/ProductGrid";
import { getProductsByCollection } from "../lib/shopify";

export default async function Page() {
  const products = await getProductsByCollection("new-arrivals");
  const targetDate = process.env.CORAL_DROP_DATE || "";

  return (
    <main className="bg-[#07111f] text-white">
      <Hero />

      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(17,181,201,0.15),transparent_40%)]" />
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(17,181,201,0.08)] backdrop-blur-md">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            Next Coral Drop
          </p>
          <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
            Living Art Releases Soon
          </h2>
          <CountdownTimer targetDate={targetDate} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Collection
            </p>
            <h2 className="text-3xl font-semibold md:text-5xl">New Arrivals</h2>
          </div>
          <p className="max-w-xl text-sm text-white/70 md:text-base">
            Hand-selected corals presented with a premium, gallery-style shopping experience.
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}
