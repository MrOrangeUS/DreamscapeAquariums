import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Dreamscape Aquariums",
  description: "Luxury headless Shopify storefront for coral collectors.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="relative pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
