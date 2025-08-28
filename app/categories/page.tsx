'use client';

import { motion } from 'framer-motion';
import CategoryGrid from '@/components/CategoryGrid';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

export default function CategoriesPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                All Categories
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Browse all product categories below. Select a category to see buying guides.
              </p>
            </motion.div>
            <CategoryGrid />
          </section>
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
