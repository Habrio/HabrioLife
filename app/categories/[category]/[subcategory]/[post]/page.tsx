import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import { notFound } from 'next/navigation';
import { fetchCategoryBySlug, fetchSubcategoryBySlugs, fetchOneBlog } from '@/src/lib/queries';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/src/components/mdx-components';
import { publicImageUrl } from '@/src/lib/supabase';
import Tiers from '@/src/components/tiers';
import { fetchBlocksForBlog, fetchBlockItemsGrouped, fetchDynamicTierItemsForSubcategory } from '@/src/lib/catalog-queries';

export const dynamic = 'force-dynamic';

type Params = { category: string; subcategory: string; post: string };

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { category: categorySlug, subcategory: subcategorySlug, post: postSlug } = await params;

  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) notFound();
  const sub = await fetchSubcategoryBySlugs(categorySlug, subcategorySlug);
  if (!sub) notFound();
  const blog = await fetchOneBlog(categorySlug, subcategorySlug, postSlug);
  if (!blog) notFound();

  // Recommendations
  let budget: any[] = [], mid: any[] = [], premium: any[] = [];
  try {
    const blocks = await fetchBlocksForBlog(blog.id);
    if (blocks.length > 0) {
      const grouped = await fetchBlockItemsGrouped(blocks[0].id);
      budget = grouped['budget'] ?? [];
      mid = grouped['mid-range'] ?? grouped['mid'] ?? [];
      premium = grouped['premium'] ?? [];
    } else {
      const dyn = await fetchDynamicTierItemsForSubcategory(sub.id);
      budget = dyn.budget;
      mid = dyn.mid;
      premium = dyn.premium;
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-6">
            <PageHeader title={blog.title} description={blog.excerpt ?? undefined} />
            {blog.cover_image_path && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={publicImageUrl(blog.cover_image_path)} alt={blog.title} className="rounded-2xl mb-6 w-full" />
            )}
            <article className="prose prose-slate dark:prose-invert max-w-none mt-6">
              {blog.content_mdx ? (
                <MDXRemote source={blog.content_mdx} components={mdxComponents as any} />
              ) : (
                <p className="text-slate-600 dark:text-slate-300">Content coming soon.</p>
              )}
            </article>
            <div className="mt-8">
              {budget.length + mid.length + premium.length > 0 ? (
                <Tiers budget={budget as any} mid={mid as any} premium={premium as any} />
              ) : (
                <section className="mt-10">
                  <div className="rounded-2xl border p-6 text-center text-slate-600">Recommendations coming soon.</div>
                </section>
              )}
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
