import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContactModal from "./components/ContactModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wbmcontractingllc.com'),
  title: "WBM Contracting L.L.C | Premium Construction Services in Dubai",
  description: "Leading construction company in Dubai offering commercial, residential, and industrial construction services. Building excellence since 1999 with unmatched quality and precision.",
  keywords: "construction Dubai, WBM Contracting, building services UAE, commercial construction, residential projects, industrial facilities, renovation services",
  openGraph: {
    title: "WBM Contracting L.L.C | Premium Construction Services in Dubai",
    description: "Leading construction company in Dubai offering commercial, residential, and industrial construction services.",
    url: 'https://www.wbmcontractingllc.com',
    siteName: 'WBM Contracting L.L.C',
    type: 'website',
    images: [{ url: '/interior-design/JPJ-004.jpeg', width: 1200, height: 630, alt: 'WBM Contracting LLC - Construction Company Dubai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "WBM Contracting L.L.C | Premium Construction Services in Dubai",
    description: "Leading construction company in Dubai offering commercial, residential, and industrial construction services.",
    images: ['/interior-design/JPJ-004.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
