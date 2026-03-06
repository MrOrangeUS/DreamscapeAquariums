import Link from "next/link";

export default function CartPage() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const checkoutUrl = domain ? `https://${domain}/cart` : "#";

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Cart</h1>
      <p className="mt-4 text-[#eafcff]/80">Secure checkout is handled on Shopify.</p>
      <Link href="#" target="_blank" className="mt-8 inline-flex rounded-full bg-[#11b5c9] px-6 py-3 font-semibold text-[#07111f] hover:brightness-110">
        Continue to Shopify
      </Link>
    </main>
  );
}