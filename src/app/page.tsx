import Hero from '../components/Hero';
import CountdownTimer from '../components/CountdownTimer';
import ProductGrid from '../components/ProductGrid';
import { getProductsByCollection } from '../lib/shopify';

export default async function Page() {
  // Fetch products from the 'new-arrivals' collection. Adjust as needed.
  const products = await getProductsByCollection('new-arrivals');
  const targetDate = process.env.NEXT_PUBLIC_CORAL_DROP_DATE || '';

  return (
    <main>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Next Coral Drop</h2>
        <CountdownTimer targetDate={targetDate} />
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
