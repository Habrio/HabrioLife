import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/kit/PageHeader';
import Section from '@/components/kit/Section';
import GuideGrid from '@/components/GuideGrid';
import { fetchSubcategoriesByCategorySlug } from '@/lib/queries';
import { fetchCategoryBySlug, fetchGuidesInCategory } from '@/lib/queries';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  // Filter guides belonging to this category slug
  const guidesForCategory = await fetchGuidesInCategory(categorySlug);
  const subs = await fetchSubcategoriesByCategorySlug(categorySlug);
  const subSlugById: Record<string, string> = Object.fromEntries(
    subs.map((s: any) => [s.id as string, s.slug as string]),
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-6">
            <PageHeader title={category.name} description={category.description ?? undefined} />

            {guidesForCategory.length === 0 ? (
              <p className="italic text-slate-500 dark:text-slate-400">
                No guides available in this category yet. Please check back soon!
              </p>
            ) : (
              <GuideGrid guides={guidesForCategory as any} categorySlug={categorySlug} subSlugById={subSlugById} />
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
  const { getCategories } = await import('@/i18n/data-translations');
  return getCategories('en').map((cat: any) => ({ category: cat.slug }));
}
