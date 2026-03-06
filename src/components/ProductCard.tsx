import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
      <Link href={`/product/${product.handle}`}>
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/80 to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-white">{product.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/65">
            {product.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-lg font-medium text-cyan-300">{product.price}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85">
              View
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
