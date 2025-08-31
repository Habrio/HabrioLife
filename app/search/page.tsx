import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import { searchBlogs, fetchAllCategoriesMap, fetchAllSubcategoriesMap } from '@/src/lib/queries';
import { toInt, pageCount } from '@/src/lib/pagination';
import Pagination from '@/src/components/pagination';
import EmptyState from '@/src/components/empty-state';
import Link from 'next/link';
import SearchForm from './search-form';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const q = (searchParams?.q as string) ?? '';
  const category = (searchParams?.category as string) ?? '';
  const sub = (searchParams?.sub as string) ?? '';
  const page = toInt(searchParams?.page, 1);
  const pageSize = 12;

  const { rows, total } = await searchBlogs({
    q: q || undefined,
    categorySlug: category || undefined,
    subcategorySlug: sub || undefined,
    page,
    pageSize,
  });
  const catMap = await fetchAllCategoriesMap();
  const subMap = await fetchAllSubcategoriesMap();
  const pages = pageCount(total, pageSize);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-6">
            <PageHeader title="Search" description="Find guides by keywords, category, or subcategory." />
            <SearchForm initialQ={q} initialCategory={category} initialSub={sub} />

            <section className="mt-8">
              {rows.length === 0 ? (
                <EmptyState title="No results" subtitle="Try a different keyword or filter." />
              ) : (
                <>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rows.map((g) => {
                      const cat = catMap.get(g.category_id);
                      const sc = subMap.get(g.subcategory_id);
                      const href = cat && sc ? `/categories/${cat.slug}/${sc.slug}/${g.slug}` : '#';
                      return (
                        <li key={g.id} className="rounded-2xl border p-5 hover:shadow transition">
                          <Link href={href} className="block">
                            <div className="text-sm text-slate-500 mb-1">
                              {cat?.name} / {sc?.name}
                            </div>
                            <div className="text-lg font-semibold">{g.title}</div>
                            {g.excerpt && <p className="text-slate-600 mt-2 line-clamp-3">{g.excerpt}</p>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Pagination page={page} pages={pages} />
                </>
              )}
            </section>
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
