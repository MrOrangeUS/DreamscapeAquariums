import { getProductByHandle } from '../../../lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: {
    handle: string;
  };
}

export const metadata = {
  title: 'Product - Dreamscape Aquariums',
};

export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle);
  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <p>Product not found.</p>
      </main>
    );
  }
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const shopifyUrl = domain ? `https://${domain}/products/${product.handle}` : '#';
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            width={800}
            height={800}
            className="rounded-lg object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-6">{product.price}</p>
          <Link
            href={shopifyUrl}
            target="_blank"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-md"
          >
            Buy on Shopify
          </Link>
        </div>
      </div>
    </main>
  );
}
