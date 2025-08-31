import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import PostsGrid from '@/components/PostsGrid';
import { fetchCategoryBySlug, fetchSubcategoryBySlugs, fetchGuidesInSubcategory } from '@/src/lib/queries';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { category, sub } = await params;
  const cat = await fetchCategoryBySlug(category);
  if (!cat) return notFound();
  const subcat = await fetchSubcategoryBySlugs(category, sub);
  if (!subcat) return notFound();
  const guides = await fetchGuidesInSubcategory(category, sub);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6">
            <PageHeader title={subcat.name} description={`Posts under ${cat.name}`} />
            <PostsGrid guides={guides as any[]} />
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export async function generateStaticParams() {
  const { getCategories, getSubcategories } = await import('@/src/i18n/data-translations');
  const cats = getCategories('en');
  const params: Array<{ category: string; sub: string }> = [];
  for (const c of cats as any[]) {
    const subs = getSubcategories(c.slug);
    for (const s of subs) params.push({ category: c.slug, sub: s.slug });
  }
  return params;
}
