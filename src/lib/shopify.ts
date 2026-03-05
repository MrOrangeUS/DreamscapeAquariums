export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  image: string;
}

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function storefront(query: string, variables: any = {}) {
  if (!domain || !token) {
hcsole.warn('Missing Shopify domain or access token');
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
