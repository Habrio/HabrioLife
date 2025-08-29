"use client";

import CategoryGrid from '@/components/CategoryGrid';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';

export default function CategoriesPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <PageHeader
              title="All Categories"
              description="Browse product categories. Select one to see buying guides."
              className="text-center"
            />
            <CategoryGrid />
          </Section>
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
