import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { categories, guides } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
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
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg text-slate-600 dark:text-slate-400">{category.description}</p>
              )}
            </div>

            {guidesForCategory.length === 0 ? (
              <p className="italic text-slate-500 dark:text-slate-400">
                No guides available in this category yet. Please check back soon!
              </p>
            ) : (
              <div className="space-y-2">
                {guidesForCategory.map((guide) => (
                  <div
                    key={guide.slug}
                    className="group p-4 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <Link
                      href={`/categories/${categorySlug}/${guide.slug}`}
                      className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {guide.title}
                      <ArrowRight className="inline-block w-4 h-4 ml-1 align-middle transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    {guide.excerpt && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{guide.excerpt}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}
