import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import PostsGrid from '@/components/PostsGrid';

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { category, sub } = await params;
  const { getGuides, getCategories, getSubcategories } = await import('@/src/i18n/data-translations');
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const cats = getCategories('en');
  const cat = cats.find((c: any) => c.slug === category);
  const subList = getSubcategories(category);
  const subName = subList.find((s) => s.slug === sub)?.name || sub;
  const guides = getGuides('en').filter((g: any) => g.category === category && slugify(g.subcategory || '') === sub);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6">
            <PageHeader title={`${subName}`} description={`Posts under ${cat?.name || category}`} />
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

