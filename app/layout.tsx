import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habrio - Premium Products & Best Deals | Curated Shopping Experience',
  description: 'Discover the best deals on premium products. Curated selection from top brands with exclusive discounts. Shop smart, save more.',
  keywords: 'deals, discounts, premium products, shopping, best prices, affiliate',
  authors: [{ name: 'Habrio' }],
  openGraph: {
    title: 'Habrio - Premium Products & Best Deals',
    description: 'Discover the best deals on premium products. Curated selection from top brands.',
    url: 'https://habrio.in',
    siteName: 'Habrio',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Habrio - Premium Shopping Experience'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habrio - Premium Products & Best Deals',
    description: 'Discover the best deals on premium products.',
    images: ['https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: 'your-google-verification-code'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://habrio.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Load fonts via link tag */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Habrio",
              "url": "https://habrio.in",
              "description": "Premium products and best deals curated for smart shoppers",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://habrio.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      {/* Apply fonts with Tailwind or CSS instead of next/font */}
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
