import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QandA from './QandA';
import { notFound } from 'next/navigation';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { fetchCategoryBySlug, fetchOneBlogByCategoryAndPost } from '@/src/lib/queries';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/src/components/mdx-components';
import { publicImageUrl } from '@/src/lib/supabase';
import Tiers from '@/src/components/tiers';
import { fetchBlocksForBlog, fetchBlockItemsGrouped, fetchDynamicTierItemsForSubcategory } from '@/src/lib/catalog-queries';
import { supabase } from '@/src/lib/supabase';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface GuidePageProps {
  params: Promise<{ category: string; post: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { category: categorySlug, post: postSlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);
  const guide = await fetchOneBlogByCategoryAndPost(categorySlug, postSlug);
  if (!category || !guide) {
    notFound();
  }

  try {
    if ((guide as any).subcategory_id) {
      const { data: sub } = await supabase
        .from('subcategories')
        .select('slug')
        .eq('id', (guide as any).subcategory_id)
        .limit(1);
      const subSlug = (sub?.[0] as any)?.slug as string | undefined;
      if (subSlug) {
        redirect(`/categories/${categorySlug}/${subSlug}/${postSlug}`);
      }
    }
  } catch {}

  # Redirect old 2-segment route to 3-segment if possible
  try:
    pass
  except Exception:
    pass

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-6">
            <div className="mb-6 flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{guide.title}</h1>
              {category?.name ? (
                <Badge className="rounded-full bg-saffron-100 text-saffron-700 dark:bg-slate-800 dark:text-saffron-400 border-0">
                  {category.name}
                </Badge>
              ) : null}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Lead intro */}
              <div className="lg:col-span-8">
                <Card className="rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur">
                  <CardContent className="pt-6">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {guide.excerpt || 'Shopping smarter starts with understanding what matters most for your needs.'}
                    </p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Good for</p>
                        <p className="text-sm text-slate-800 dark:text-slate-200">Students, Work, Everyday</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Budget range</p>
                        <p className="text-sm text-slate-800 dark:text-slate-200">Budget · Mid-Range · Premium</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Time to decide</p>
                        <p className="text-sm text-slate-800 dark:text-slate-200">~15 minutes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

            {/* Content (MDX from DB if available) */}
            {guide.cover_image_path && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={publicImageUrl(guide.cover_image_path)} alt={guide.title} className="rounded-2xl mb-6 w-full" />
            )}
            <article className="prose prose-slate dark:prose-invert max-w-none mt-6">
              {guide.content_mdx ? (
                <MDXRemote source={guide.content_mdx} components={mdxComponents as any} />
              ) : (
                <p className="text-slate-600 dark:text-slate-300">Content coming soon.</p>
              )}
            </article>

            {/* Recommendations (curated first, dynamic fallback) */}
            {await (async () => {
              let budget: any[] = [];
              let mid: any[] = [];
              let premium: any[] = [];
              try {
                const blocks = await fetchBlocksForBlog(guide.id);
                if (blocks.length > 0) {
                  const grouped = await fetchBlockItemsGrouped(blocks[0].id);
                  budget = grouped['budget'] ?? [];
                  mid = grouped['mid-range'] ?? grouped['mid'] ?? [];
                  premium = grouped['premium'] ?? [];
                } else if ((guide as any).subcategory_id) {
                  const dyn = await fetchDynamicTierItemsForSubcategory((guide as any).subcategory_id);
                  budget = dyn.budget;
                  mid = dyn.mid;
                  premium = dyn.premium;
                }
              } catch {}

              return (
                <div className="mt-8">
                  {budget.length + mid.length + premium.length > 0 ? (
                    <Tiers budget={budget as any} mid={mid as any} premium={premium as any} />
                  ) : (
                    <section className="mt-10">
                      <div className="rounded-2xl border p-6 text-center text-slate-600">
                        Recommendations coming soon.
                      </div>
                    </section>
                  )}
                </div>
              );
            })()}

                {/* Quick picks CTA */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="default" className="rounded-full">
                    <a href={`/categories/${categorySlug}/${postSlug}/recommendations#budget`}>
                      Budget Picks <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" className="rounded-full">
                    <a href={`/categories/${categorySlug}/${postSlug}/recommendations#mid-range`}>
                      Mid-Range Picks <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={`/categories/${categorySlug}/${postSlug}/recommendations#premium`}>
                      Premium Picks <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* TOC aside */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24 h-max">
                <Card className="rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur">
                  <CardContent className="pt-6">
                    <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">On this page</p>
                    <nav className="space-y-2 text-sm">
                      <a href="#budget-usage" className="block text-slate-700 hover:text-saffron-700 dark:text-slate-300 dark:hover:text-saffron-400">Budget & Usage</a>
                      <a href="#key-specs" className="block text-slate-700 hover:text-saffron-700 dark:text-slate-300 dark:hover:text-saffron-400">Key Specifications</a>
                      <a href="#support" className="block text-slate-700 hover:text-saffron-700 dark:text-slate-300 dark:hover:text-saffron-400">Brand & Warranty</a>
                      <a href="#checklist" className="block text-slate-700 hover:text-saffron-700 dark:text-slate-300 dark:hover:text-saffron-400">Buying Checklist</a>
                    </nav>
                  </CardContent>
                </Card>
              </aside>
            </div>

            {/* Q&A Section */}
            <div className="mt-8">
              <QandA categorySlug={categorySlug} postSlug={postSlug} />
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export async function generateStaticParams() {
  const { fetchAllBlogCategorySlugPairs } = await import('@/src/lib/queries');
  return fetchAllBlogCategorySlugPairs();
}
