"use client";

import Link from 'next/link';

const Navbar: React.FC = () => (
  <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/">
            <span className="font-bold text-xl">Dreamscape</span>
          </Link>
        </div>
        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            About
          </Link>
          <Link
            href="/cart"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Cart
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
