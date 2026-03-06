import ProductCard from "./ProductCard";

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
