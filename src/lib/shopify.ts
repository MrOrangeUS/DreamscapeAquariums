const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-07";

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string;
};

type ShopifyCollectionResponse = {
  data?: {
    collection?: {
      products: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            handle: string;
            featuredImage?: { url: string } | null;
            priceRange: {
              minVariantPrice: {
                amount: string;
                currencyCode: string;
              };
            };
          };
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

export async function getProductsFromCollection(
  collectionHandle: string,
  first = 3,
): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Missing required Shopify environment variables");
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const query = `
    query CollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first, sortKey: CREATED, reverse: true) {
          edges {
            node {
              id
              title
              handle
              featuredImage {
                url
              }
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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables: { handle: collectionHandle, first } }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const safeSnippet = responseText
      ? responseText.replace(/\s+/g, " ").trim().slice(0, 300)
      : "<empty body>";

    throw new Error(
      `Shopify API request failed: ${response.status} ${response.statusText}. Response: ${safeSnippet}`,
    );
  }

  const json = (await response.json()) as ShopifyCollectionResponse;

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  const edges = json.data?.collection?.products?.edges ?? [];

  return edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    image: node.featuredImage?.url || "/reef-placeholder.svg",
    price: `${node.priceRange.minVariantPrice.currencyCode} ${Number(node.priceRange.minVariantPrice.amount).toFixed(2)}`,
  }));
}
