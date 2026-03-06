const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = "2023-07";

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  price: string;
};

type StorefrontResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

async function storefrontFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<StorefrontResponse<T>> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Missing required Shopify environment variables");
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const safeSnippet = responseText
      ? responseText.replace(/\s+/g, " ").trim().slice(0, 300)
      : "<empty body>";

    if (response.status === 401 || response.status === 403) {
      console.error(
        `Shopify auth failed (${response.status} ${response.statusText}). Domain=${SHOPIFY_STORE_DOMAIN}, API=${SHOPIFY_API_VERSION}. Response: ${safeSnippet}`,
      );
      return {};
    }

    throw new Error(
      `Shopify API request failed: ${response.status} ${response.statusText}. Response: ${safeSnippet}`,
    );
  }

  const json = (await response.json()) as StorefrontResponse<T>;

  if (json.errors?.length) {
    throw new Error(
      `Shopify GraphQL errors: ${json.errors.map((e) => e.message || "<empty>").join(", ")}`,
    );
  }

  return json;
}

export async function getProductsByCollection(collectionHandle: string, first = 12): Promise<Product[]> {
  const query = `
    query CollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first, sortKey: CREATED, reverse: true) {
          edges {
            node {
              id
              title
              handle
              description
              featuredImage { url }
              priceRange {
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

  type CollectionData = {
    collection?: {
      products?: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            handle: string;
            description: string;
            featuredImage?: { url: string } | null;
            priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
          };
        }>;
      };
    };
  };

  const json = await storefrontFetch<CollectionData>(query, { handle: collectionHandle, first });
  const edges = json.data?.collection?.products?.edges ?? [];

  return edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    image: node.featuredImage?.url || "/reef-placeholder.svg",
    price: `${node.priceRange.minVariantPrice.currencyCode} ${Number(node.priceRange.minVariantPrice.amount).toFixed(2)}`,
  }));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        featuredImage { url }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  type ProductData = {
    product?: {
      id: string;
      title: string;
      handle: string;
      description: string;
      featuredImage?: { url: string } | null;
      priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    } | null;
  };

  const json = await storefrontFetch<ProductData>(query, { handle });
  const product = json.data?.product;
  if (!product) return null;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    image: product.featuredImage?.url || "/reef-placeholder.svg",
    price: `${product.priceRange.minVariantPrice.currencyCode} ${Number(product.priceRange.minVariantPrice.amount).toFixed(2)}`,
  };
}