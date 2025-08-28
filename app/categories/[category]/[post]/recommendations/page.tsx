'use client';

import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { guides, categories } from '@/lib/data';
import { Star } from 'lucide-react';

interface RecPageProps {
  params: { category: string; post: string };
}

export default function RecommendationsPage({ params }: RecPageProps) {
  const { category: categorySlug, post: postSlug } = params;
  const guide = guides.find((g) => g.slug === postSlug && g.category === categorySlug);
  const category = categories.find((c) => c.slug === categorySlug);

  const recs = (guide as any)?.recommendations as
    | { [k: string]: Array<{ title: string; price: string; rating: number; image?: string; affiliate?: string }> }
    | undefined;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Link
              href={`/categories/${categorySlug}/${postSlug}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              ← Back to Guide
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-slate-900 dark:text-white">
              Top {guide?.product ?? 'Product'} Picks
            </h1>
            {category?.name && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Category: {category.name}</p>
            )}

            {!recs ? (
              <p className="italic text-slate-500 dark:text-slate-400">No recommendations available.</p>
            ) : (
              <div className="space-y-12">
                <RecSection id="budget" title="Budget Picks" items={recs['budget'] ?? []} />
                <RecSection id="mid-range" title="Mid-Range Picks" items={recs['mid-range'] ?? []} />
                <RecSection id="premium" title="Premium Picks" items={recs['premium'] ?? []} />
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

function RecSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: Array<{ title: string; price: string; rating: number; image?: string; affiliate?: string }>;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{title}</h2>
      {items.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 italic">No items in this tier yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((prod) => (
            <div
              key={prod.title}
              className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
              )}
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{prod.title}</h3>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(prod.rating) ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">{prod.rating.toFixed(1)}/5</span>
              </div>
              <p className="text-slate-900 dark:text-slate-100 font-semibold">Price: {prod.price}</p>
              <a
                href={prod.affiliate || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Buy on Amazon
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
