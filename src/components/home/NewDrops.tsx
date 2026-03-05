import CoralCard from '../CoralCard'
import { getProductsFromCollection } from '../../lib/shopify'

/**
 * NewDrops fetches products from the "new-arrivals-sorted-newest-first"
 * collection on the server and renders them as coral cards. Because this
 * component does not include a `'use client'` directive, it runs on the
 * server by default, keeping sensitive environment variables out of the
 * client bundle. Products are fetched during the server render and
 * returned to the client as part of the HTML payload.
 */
export default async function NewDrops() {
  // Fetch up to three products from the specified collection. The helper
  // pulls data from the Shopify Storefront API using server-side
  // environment variables. See `src/lib/shopify.ts` for details.
  const products = await getProductsFromCollection(
    'new-arrivals-sorted-newest-first'
  )
  // Log the products to the server console for debugging purposes. This
  // will appear in the Vercel logs but not in the browser console.
  console.log('Fetched products for NewDrops:', products)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        // Spread the product properties onto the CoralCard component. The
        // component itself will render the image, title, price and WYSIWYG
        // badge, and link to the Shopify product page.
        <CoralCard key={product.id} {...product} />
      ))}
    </div>
  )
}