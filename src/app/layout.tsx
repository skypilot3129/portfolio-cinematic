import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import './ProfileCard.css'; // TAMBAHKAN INI

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const syne = Syne({
  subsets: ["latin"],
  weight: ['400', '700', '800'],
  variable: '--font-syne'
});

export const metadata: Metadata = {
  title: "Mas Eugene | AI Website Developer",
  description: "Portfolio milik Mas Eugene, seorang AI Website Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.variable} ${syne.variable} bg-navy font-sans antialiased`}>{children}</body>
    </html>
  );
}

