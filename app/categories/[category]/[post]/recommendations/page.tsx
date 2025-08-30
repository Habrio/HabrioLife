import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { } from '@/lib/data';
import { Star } from 'lucide-react';
import { notFound } from 'next/navigation';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import ProductCard from '@/src/components/kit/ProductCard';
import Rating from '@/src/components/kit/Rating';

interface RecPageProps {
  params: Promise<{ category: string; post: string }>;
}

export default async function RecommendationsPage({ params }: RecPageProps) {
  const { category: categorySlug, post: postSlug } = await params;
  const { getGuides, getCategories } = await import('@/src/i18n/data-translations');
  const guide = getGuides('en').find((g: any) => g.slug === postSlug && g.category === categorySlug);
  const category = getCategories('en').find((c: any) => c.slug === categorySlug);
  if (!guide) {
    notFound();
  }

  const recs = (guide as any)?.recommendations as
    | { [k: string]: Array<{ title: string; price: string; rating: number; image?: string; affiliate?: string }> }
    | undefined;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-6">
            <Link
              href={`/categories/${categorySlug}/${postSlug}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              ← Back to Guide
            </Link>

            <PageHeader
              className="mt-4"
              title={`Top ${guide?.product ?? 'Product'} Picks`}
              description={category?.name ? `Category: ${category.name}` : undefined}
            />

            {!recs ? (
              <p className="italic text-slate-500 dark:text-slate-400">No recommendations available.</p>
            ) : (
              <div className="space-y-12">
                <RecSection id="budget" title="Budget Picks" items={recs['budget'] ?? []} />
                <RecSection id="mid-range" title="Mid-Range Picks" items={recs['mid-range'] ?? []} />
                <RecSection id="premium" title="Premium Picks" items={recs['premium'] ?? []} />
              </div>
            )}
          </Section>
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
            <ProductCard
              key={prod.title}
              title={prod.title}
              price={prod.price}
              image={prod.image}
              href={prod.affiliate || '#'}
              ctaLabel="Buy on Amazon"
            />
          ))}
        </div>
      )}
    </section>
  );
}

export async function generateStaticParams() {
  const { getGuides } = await import('@/src/i18n/data-translations');
  return getGuides('en').map((g: any) => ({ category: g.category, post: g.slug }));
}
