'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { guides, categories } from '@/lib/data';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  const results = q
    ? guides.filter((g) =>
        g.title.toLowerCase().includes(q) ||
        g.product.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.excerpt?.toLowerCase().includes(q) ?? false)
      )
    : [];

  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name || slug;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Search Results</h1>
            {q ? (
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Results for "<span className="font-semibold">{q}</span>"
              </p>
            ) : (
              <p className="mb-6 text-slate-600 dark:text-slate-400">Please enter a search term.</p>
            )}

            {q && results.length === 0 && (
              <p className="text-slate-500 dark:text-slate-400">No guides found for "{q}".</p>
            )}

            {results.length > 0 && (
              <div className="divide-y divide-slate-200 dark:divide-slate-700 rounded-lg overflow-hidden bg-white/60 dark:bg-slate-800/60 backdrop-blur">
                {results.map((g) => (
                  <div key={`${g.category}-${g.slug}`} className="p-4">
                    <Link
                      href={`/categories/${g.category}/${g.slug}`}
                      className="text-xl font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {g.title}
                    </Link>
                    {g.excerpt && (
                      <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">{g.excerpt}</p>
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Category: {categoryName(g.category)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

