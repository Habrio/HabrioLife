'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { categories, guides } from '@/lib/data';

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const category = categories.find((cat) => cat.slug === categorySlug);

  // Filter guides belonging to this category slug
  const guidesForCategory = guides.filter((g) => g.category === categorySlug);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                {category?.name ?? 'Category'}
              </h1>
              {category?.description && (
                <p className="text-lg text-slate-600 dark:text-slate-400">{category.description}</p>
              )}
            </motion.div>

            {guidesForCategory.length === 0 ? (
              <p className="italic text-slate-500 dark:text-slate-400">
                No guides available in this category yet. Please check back soon!
              </p>
            ) : (
              <div className="space-y-6">
                {guidesForCategory.map((guide, index) => (
                  <motion.div
                    key={guide.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border rounded-xl p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur border-slate-200 dark:border-slate-800 hover:shadow transition"
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-100">
                      <Link href={`/categories/${categorySlug}/${guide.slug}`}>{guide.title}</Link>
                    </h3>
                    {guide.excerpt && (
                      <p className="text-slate-600 dark:text-slate-400 mb-2">{guide.excerpt}</p>
                    )}
                    <Link
                      href={`/categories/${categorySlug}/${guide.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
                    >
                      Read More →
                    </Link>
                  </motion.div>
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

