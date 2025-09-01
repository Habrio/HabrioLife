import './globals.css';
import { LanguageProvider } from '@/src/i18n/LanguageProvider';
import type { Metadata } from 'next';
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Habrio - Smart Buying Guides & Product Recommendations',
  description: 'Learn how to choose the best products with in-depth buying guides and curated recommendations. Shop smarter with Habrio.',
  keywords: 'buying guide, product recommendations, how to buy, shopping tips',
  authors: [{ name: 'Habrio' }],
  openGraph: {
    title: 'Habrio - Smart Buying Guides & Picks',
    description: 'In-depth buying guides and curated product recommendations.',
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
    title: 'Habrio - Smart Buying Guides & Picks',
    description: 'In-depth buying guides and curated product recommendations.',
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
              "description": "In-depth buying guides and curated recommendations for smart shoppers",
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
        <LanguageProvider>
          <ThemeProvider>
            <Navigation />
            <main className="pt-16 min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
