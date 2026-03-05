import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Dreamscape Aquariums',
  description: 'Immersive reef and coral shop',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 bg-reef">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
