import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="border rounded-lg overflow-hidden shadow-md">
    <Link href={`/product/${product.handle}`}>
      <div className="relative h-64 w-full">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <span className="text-lg font-bold">{product.price}</span>
      </div>
    </Link>
  </div>
);

export default ProductCard;
