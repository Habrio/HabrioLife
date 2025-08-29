"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { guides, categories } from '@/lib/data';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Search } from 'lucide-react';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import EmptyState from '@/src/components/kit/EmptyState';
import { Card } from '@/components/ui/card';

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
          <Section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <PageHeader
              title="Search Results"
              description={q ? `Results for "${q}"` : 'Please enter a search term.'}
              className="mb-4"
            />

            {!q ? (
              <EmptyState title="Start typing to search" description="Try a product or category keyword." icon={Search} />
            ) : results.length === 0 ? (
              <EmptyState title={`No guides found for "${q}"`} description="Try a different keyword or check categories." />
            ) : (
              <Card className="divide-y divide-slate-200/80 dark:divide-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-2xl">
                {results.map((g) => (
                  <div key={`${g.category}-${g.slug}`} className="group p-4 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-2xl">
                    <Link
                      href={`/categories/${g.category}/${g.slug}`}
                      className="text-lg font-semibold text-slate-800 hover:text-saffron-700 dark:text-slate-100 dark:hover:text-saffron-400"
                    >
                      {g.title}
                      <ArrowRight className="inline-block w-4 h-4 ml-1 align-middle transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    {g.excerpt && <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{g.excerpt}</p>}
                    <span className="text-xs text-slate-500 dark:text-slate-400">Category: {categoryName(g.category)}</span>
                  </div>
                ))}
              </Card>
            )}
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
