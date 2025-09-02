"use client";

import CategoryGrid from '@/components/CategoryGrid';
import Section from '@/components/kit/Section';
import PageHeader from '@/components/kit/PageHeader';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
      <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6">
            <PageHeader title="All Categories" description="Browse guide categories and start exploring." className="text-center" />
            <CategoryGrid />
          </Section>
      </main>
    </div>
  );
}
