export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  price: string;
}

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.warn("Shopify env vars are missing. Returning empty data.");
    return null;
  }

  const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error: { message: string }) => error.message).join(", "));
  }

  return payload.data as T;
}

function formatProduct(node: any): Product {
  const amount = Number(node?.priceRangeV2?.minVariantPrice?.amount ?? 0);
  const currencyCode = node?.priceRangeV2?.minVariantPrice?.currencyCode ?? "USD";

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description || "",
    image: node?.images?.edges?.[0]?.node?.url || "",
    price: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(amount),
  };
}

export async function getProductsByCollection(collectionHandle: string): Promise<Product[]> {
  const query = `
    query GetProductsByCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        products(first: 24) {
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

  type Data = {
    collectionByHandle?: {
      products?: {
        edges?: Array<{ node: any }>;
      };
    };
  };

  const data = await storefrontFetch<Data>(query, { handle: collectionHandle });
  const edges = data?.collectionByHandle?.products?.edges ?? [];

  return edges.map((edge) => formatProduct(edge.node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        images(first: 1) {
          edges {
            node {
              url
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

  type Data = {
    productByHandle?: any;
  };

  const data = await storefrontFetch<Data>(query, { handle });

  if (!data?.productByHandle) {
    return null;
  }

  return formatProduct(data.productByHandle);
}
