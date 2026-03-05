import { getProductsByCollection } from '../../lib/shopify';
import ProductGrid from '../../components/ProductGrid';

export const metadata = {
  title: 'Products - Dreamscape Aquariums',
  description: 'All products available in our store.',
};

export default async function ProductsPage() {
  // Use 'all' collection handle or update to your specific collection.
  const products = await getProductsByCollection('all');
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      <ProductGrid products={products} />
    </main>
  );
}
