import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { categories, guides } from '@/lib/data';
import QandA from './QandA';
import { notFound } from 'next/navigation';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface GuidePageProps {
  params: Promise<{ category: string; post: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { category: categorySlug, post: postSlug } = await params;

  const guide = guides.find((g) => g.slug === postSlug && g.category === categorySlug);
  if (!guide) {
    notFound();
  }
  const category = categories.find((c) => c.slug === categorySlug);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
                      {guide.product
                        ? `Buying a ${guide.product.toLowerCase()} doesn’t need to be overwhelming. This guide distills what truly matters so you can pick the right ${guide.product.toLowerCase()} for your needs and budget.`
                        : 'Buying the right product doesn’t need to be overwhelming. This guide distills what truly matters so you can choose confidently.'}
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

                {/* Sections */}
                <article className="prose prose-slate dark:prose-invert max-w-none mt-6">
                  <h2 id="budget-usage">1. Budget and Usage</h2>
                  <p>
                    Start with a realistic budget and your primary use-cases. Consider how often you’ll use it
                    and which features are essential versus nice-to-have.
                  </p>

                  <h2 id="key-specs">2. Key Specifications</h2>
                  <p>Focus on the specs that impact performance and experience. Common items to evaluate:</p>
                  <ul>
                    <li><strong>Performance:</strong> Match the power (CPU/Motor, etc.) to your workload.</li>
                    <li><strong>Size & Capacity:</strong> Ensure it fits your space and needs.</li>
                    <li><strong>Build Quality:</strong> Prefer sturdy materials and reliable components.</li>
                  </ul>

                  {guide.product?.toLowerCase() === 'laptop' && (
                    <>
                      <h3>For Laptops</h3>
                      <ul>
                        <li><strong>Processor:</strong> Intel i5/Ryzen 5 or better for balanced performance.</li>
                        <li><strong>Memory:</strong> 8GB minimum for multitasking; 16GB+ for longevity.</li>
                        <li><strong>Storage:</strong> SSD preferred; 256GB+ recommended.</li>
                        <li><strong>Display:</strong> 14–15.6” FHD is a sweet spot for most users.</li>
                        <li><strong>Battery:</strong> Aim for 6+ hours real-world usage.</li>
                      </ul>
                    </>
                  )}

                  <h2 id="support">3. Brand, Support, and Warranty</h2>
                  <p>
                    Reputable brands often provide better quality control and after-sales support. Check warranty terms,
                    service networks, and user reviews for real-world reliability.
                  </p>

                  <h2 id="checklist">Buying Checklist</h2>
                  <ul className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Set a realistic budget',
                      'List top 3 use-cases',
                      'Shortlist 2–3 trusted brands',
                      'Compare key specs side-by-side',
                      'Check warranty and service',
                      'Read a few recent reviews',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </article>

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
  return guides.map((g) => ({ category: g.category, post: g.slug }));
}
