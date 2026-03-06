import Image from "next/image";
import Link from "next/link";

type CoralCardProps = {
  title: string;
  handle: string;
  image: string;
  price: string;
};

export default function CoralCard({ title, handle, image, price }: CoralCardProps) {
  const href = `https://shop.dreamscapeaquariums.com/products/${handle}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-900/80 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-1 hover:shadow-cyan-400/25"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute right-3 top-3 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold tracking-wide text-white">
          WYSIWYG
        </span>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-white">{title}</h3>
        <p className="text-lg font-bold text-cyan-300">{price}</p>
      </div>
    </Link>
  );
}
