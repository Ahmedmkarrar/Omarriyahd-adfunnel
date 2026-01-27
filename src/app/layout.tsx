import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "9805 Steelhead Rd | Luxury Mediterranean Estate | Paso Robles, CA",
  description:
    "Experience luxury living in this stunning 4-bedroom, 3.5-bath Mediterranean estate near Lake Nacimiento. Panoramic views, entertainer's kitchen, and ADU potential on 1 acre. Listed at $1,195,000.",
  keywords: [
    "Paso Robles luxury home",
    "Lake Nacimiento real estate",
    "Mediterranean estate California",
    "luxury home Paso Robles",
    "wine country real estate",
    "4 bedroom luxury home",
    "Heritage Ranch home for sale",
  ],
  openGraph: {
    title: "Private Mediterranean Estate | 9805 Steelhead Rd, Paso Robles",
    description:
      "4 Bed | 3.5 Bath | 1 Acre | Lake Views | $1,195,000 - Schedule your private showing today.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "9805 Steelhead Rd - Luxury Mediterranean Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "9805 Steelhead Rd | Luxury Mediterranean Estate",
    description:
      "Experience luxury living near Lake Nacimiento. 4 Bed | 3.5 Bath | 1 Acre | $1,195,000",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        {/* Google Analytics Placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
      </head>
      <body
        className={`${inter.className} bg-luxury-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
