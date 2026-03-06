# Dreamscape Aquariums Coral Frontend

Next.js 14 + Tailwind + TypeScript storefront homepage for live coral drops.

## Required Vercel Environment Variables

- `SHOPIFY_STORE_DOMAIN=dreamscape-aquariums.myshopify.com`
- `SHOPIFY_STOREFRONT_TOKEN=<storefront_token>`
- `SHOPIFY_API_VERSION=2024-07`

## Shopify Collection Feed

Homepage feed pulls from:

- `new-arrivals-sorted-newest-first`

via `getProductsFromCollection("new-arrivals-sorted-newest-first")` in:

- `src/components/home/NewDrops.tsx`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Notes

- Product cards link to:
  - `https://shop.dreamscapeaquariums.com/products/{handle}`
- Temporary Shopify debug logging is enabled in `NewDrops.tsx`:
  - `console.log(products)`
