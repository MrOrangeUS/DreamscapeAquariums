export interface Product {
  id: string
  handle: string
  title: string
  image: string
  price: number
}

/**
 * Fetch products from a Shopify collection using the Storefront API.
 *
 * The collection handle must correspond to a collection defined in Shopify.
 * This helper sends a GraphQL query to the Shopify Storefront API and
 * returns an array of simplified product objects containing the id,
 * handle, title, first image URL and the first variant price.
 */
export async function getProductsFromCollection(
  handle: string,
  first = 3
): Promise<Product[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN
  const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-07'
  if (!domain || !token) {
    console.warn('Shopify environment variables are not set')
    return []
  }
  const url = `https://${domain}/api/${apiVersion}/graphql.json`
  const query = /* GraphQL */ `
    query GetProducts($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              images(first: 1) {
                edges {
                  node {
                    src
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const variables = { handle, first }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token ?? ''
    },
    body: JSON.stringify({ query, variables }),
    // revalidate after 60 seconds when using server components
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    console.error('Failed to fetch products from Shopify:', await res.text())
    return []
  }
  const json = await res.json()
  const edges =
    json?.data?.collectionByHandle?.products?.edges ?? []
  return edges.map((edge: any) => {
    const node = edge.node
    const image = node.images.edges[0]?.node.src || ''
    const price = parseFloat(
      node.variants.edges[0]?.node.price.amount || '0'
    )
    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      image,
      price,
    } as Product
  })
}