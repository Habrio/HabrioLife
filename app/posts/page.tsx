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

export const dynamic = 'force-dynamic';

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const category = (searchParams?.category as string) ?? '';
  const sub = (searchParams?.sub as string) ?? '';
  const page = toInt(searchParams?.page, 1);
  const pageSize = 12;

  const { rows, total } = await searchBlogs({
    categorySlug: category || undefined,
    subcategorySlug: sub || undefined,
    page,
    pageSize,
  });
  const catMap = await fetchAllCategoriesMap();
  const subMap = await fetchAllSubcategoriesMap();
  const pages = pageCount(total, pageSize);

  let title = 'All Guides';
  let description = 'Browse every “How to buy” guide.';
  if (category) {
    const cat = Array.from(catMap.values()).find((c) => c.slug === category);
    title = `${cat?.name || category} Posts`;
    description = `Latest guides and picks in ${cat?.name || category}.`;
    if (sub) {
      const subName = Array.from(subMap.values()).find(
        (s) => s.slug === sub && s.category_id === (cat?.id ?? ''),
      )?.name;
      title = `${subName || sub} Posts`;
      description = `${subName || sub} under ${cat?.name || category}.`;
    }
  }
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6">
            <PageHeader title={title} description={description} />
            {rows.length === 0 ? (
              <EmptyState title="No guides yet" />
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
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
