import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import { fetchCategoryBySlug, fetchSubcategoryBySlugs, fetchGuidesInSubcategory } from '@/src/lib/queries';
import Link from 'next/link';
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
            {guides.length === 0 ? (
              <p className="text-slate-600">No guides yet.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((g: any) => (
                  <li key={g.id} className="rounded-2xl border p-5 hover:shadow transition">
                    <Link href={`/categories/${cat.slug}/${subcat.slug}/${g.slug}`} className="block">
                      <div className="text-sm text-slate-500 mb-1">{cat.name} / {subcat.name}</div>
                      <div className="text-lg font-semibold">{g.title}</div>
                      {g.excerpt && <p className="text-slate-600 mt-2 line-clamp-3">{g.excerpt}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export async function generateStaticParams() {
  const { fetchCategories, fetchSubcategoriesByCategorySlug } = await import('@/src/lib/queries');
  const cats = await fetchCategories();
  const out: Array<{ category: string; sub: string }> = [];
  for (const c of cats as any[]) {
    const subs = await fetchSubcategoriesByCategorySlug(c.slug);
    for (const s of subs) out.push({ category: c.slug, sub: (s as any).slug });
  }
  return out;
}
