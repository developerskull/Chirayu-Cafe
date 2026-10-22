import type { Metadata } from "next";
import { Poppins, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";
import { CartProvider } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chirayu Cafe | चिरायु कॅफे – Real Time To Celebrate | Mhasrul, Nashik",
    template: "%s | Chirayu Cafe Nashik",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Chirayu Cafe" }],
  creator: "Chirayu Cafe",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: "Chirayu Cafe",
    title: "Chirayu Cafe – Real Time To Celebrate | Mhasrul, Nashik",
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chirayu Cafe Nashik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirayu Cafe – Real Time To Celebrate",
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  name: "Chirayu Cafe",
  alternateName: "चिरायु कॅफे",
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/og-image.png`,
  telephone: [
    `+91${siteConfig.phones.reshma.number}`,
    `+91${siteConfig.phones.sachin.number}`,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 3, Lotus Avenue Apartment, Kala Nagar, Near Reliance Petrol Pump",
    addressLocality: "Mhasrul",
    addressRegion: "Nashik",
    addressCountry: "IN",
    postalCode: "422004",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.99",
    longitude: "73.78",
  },
  servesCuisine: ["Indian", "Street Food", "Continental"],
  hasMenu: `${siteConfig.url}/#menu`,
  priceRange: "₹",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "23:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${notoDevanagari.variable}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-poppins bg-cream text-gray-900 antialiased">
        <LangProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
