import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { categories, guides } from '@/lib/data';
import { notFound } from 'next/navigation';
import PageHeader from '@/src/components/kit/PageHeader';
import Section from '@/src/components/kit/Section';
import GuideGrid from '@/components/GuideGrid';
import CategoryHeader from '@/components/CategoryHeader';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
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
            <CategoryHeader slug={categorySlug} fallbackName={category.name} fallbackDescription={category.description} />

            {guidesForCategory.length === 0 ? (
              <p className="italic text-slate-500 dark:text-slate-400">
                No guides available in this category yet. Please check back soon!
              </p>
            ) : (
              <GuideGrid guides={guidesForCategory as any} categorySlug={categorySlug} />
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
  const { getCategories } = await import('@/src/i18n/data-translations');
  return getCategories('en').map((cat: any) => ({ category: cat.slug }));
}
