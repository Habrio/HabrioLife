import Section from '@/components/kit/Section';
import PageHeader from '@/components/kit/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
      <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-6">
            <PageHeader title="About Habrio" description="Your trusted companion for smarter shopping." />
            <Card className="rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur">
              <CardContent className="pt-6 text-slate-700 dark:text-slate-300">
                <p className="mb-6">
                  Habrio helps you make informed purchases with friendly “How to Buy” guides
                  and curated recommendations across budgets.
                </p>
                <div className="space-y-4 mb-8">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">How It Works</h2>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <span className="font-semibold">Browse Categories:</span> Pick a product category like
                      Electronics or Home &amp; Garden.
                    </li>
                    <li>
                      <span className="font-semibold">Read Guides:</span> Learn the key factors to consider.
                    </li>
                    <li>
                      <span className="font-semibold">Get Recommendations:</span> See picks across Budget, Mid-Range, and Premium tiers.
                    </li>
                    <li>
                      <span className="font-semibold">No Account Needed:</span> Everything works without logging in.
                    </li>
                  </ol>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Affiliate Disclosure:</strong> We may earn a small commission from purchases made through our links. This does not affect your price or our recommendations.
                </p>
              </CardContent>
            </Card>
          </Section>
      </main>
    </div>
  );
}
