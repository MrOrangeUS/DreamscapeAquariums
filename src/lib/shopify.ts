export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  image: string;
}

const domain = process.env.SHOPIFY_STORE_DOMAIN;
    // Retrieve the Shopify Storefront access token from the environment. Using
    // `process.env` directly instead of `process.process.env` avoids a runtime
    // error and ensures the value is pulled from the Node.js process
    // environment. Do not prefix this variable with `NEXT_PUBLIC_` since
    // storefront credentials should remain on the server.
    const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

async function storefront(query: string, variables: any = {}) {
  if (!domain || !token) {

        console.warn('Missing Shopify domain or access token');
    return {};
  }
  const url = `https://${domain}/api/2023-07/graphql.json`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({ query, variables }),
    // Next.js uses the `next` option to configure ISR (incremental static
    // regeneration). TypeScript's RequestInit definition does not include
    // this field, so we ignore the type error here. Without this option,
    // every request would revalidate the data on each call, which is not
    // desirable. The ignore directive allows the code to compile while
    // still enabling caching.
    // @ts-ignore
    next: { revalidate: 60 },
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data;
}

/**
 * Fetch products from a given collection handle.
 * @param collectionHandle The Shopify collection handle (e.g. 'new-arrivals').
 */
export async function getProductsByCollection(collectionHandle: string): Promise<Product[]> {
  const query = `
    query getProducts($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await storefront(query, { handle: collectionHandle });
  const edges = data?.collectionByHandle?.products?.edges || [];
  return edges.map(({ node }: any) => {
    const imageNode = node.images?.edges?.[0]?.node;
    const image = imageNode ? imageNode.url : '';
    const price = `${node.priceRangeV2.minVariantPrice.amount} ${node.priceRangeV2.minVariantPrice.currencyCode}`;
    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price,
      image,
    } as Product;
  });
}

/**
 * Fetch a single product by its handle from Shopify. Returns null if not found.
 * @param handle The product handle
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;
  const data = await storefront(query, { handle });
  const product = data?.productByHandle;
  if (!product) return null;
  const imageNode = product.images?.edges?.[0]?.node;
  const image = imageNode ? imageNode.url : '';
  const price = `${product.priceRangeV2.minVariantPrice.amount} ${product.priceRangeV2.minVariantPrice.currencyCode}`;
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    price,
    image,
  } as Product;
}
