import Image from 'next/image'
import Link from 'next/link'

export interface CoralCardProps {
  title: string
  handle: string
  image: string
  price: number
}

/**
 * A simple card component for displaying coral products.
 *
 * Each card links to the Shopify product page and shows a WYSIWYG badge
 * indicating that what you see is what you get. The card includes the
 * product image, title and price.
 */
export default function CoralCard({
  title,
  handle,
  image,
  price,
}: CoralCardProps) {
  const href = `https://shop.dreamscapeaquariums.com/products/${handle}`
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-150"
    >
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        )}
      </div>
      <div className="p-4 bg-white dark:bg-gray-900">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
          {title}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-bold">
          ${price.toFixed(2)}
        </p>
        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">
          WYSIWYG
        </span>
      </div>
    </Link>
  )
}