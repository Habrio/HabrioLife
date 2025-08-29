import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { categories, guides } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import PageHeader from '@/src/components/kit/PageHeader';
import Section from '@/src/components/kit/Section';

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const category = categories.find((cat) => cat.slug === categorySlug);
  if (!category) {
    notFound();
  }

  // Filter guides belonging to this category slug
  const guidesForCategory = guides.filter((g) => g.category === categorySlug);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <PageHeader title={category.name} description={category.description} />

            {guidesForCategory.length === 0 ? (
              <p className="italic text-slate-500 dark:text-slate-400">
                No guides available in this category yet. Please check back soon!
              </p>
            ) : (
              <Card className="divide-y divide-slate-200/80 dark:divide-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-2xl">
                {guidesForCategory.map((guide) => (
                  <div key={guide.slug} className="group p-4 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-2xl">
                    <Link
                      href={`/categories/${categorySlug}/${guide.slug}`}
                      className="text-lg font-semibold text-slate-800 hover:text-saffron-700 dark:text-slate-100 dark:hover:text-saffron-400"
                    >
                      {guide.title}
                      <ArrowRight className="inline-block w-4 h-4 ml-1 align-middle transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    {guide.excerpt && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{guide.excerpt}</p>
                    )}
                  </div>
                ))}
              </Card>
            )}
          </Section>
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}
