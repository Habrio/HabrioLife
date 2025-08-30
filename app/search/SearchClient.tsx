"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/src/i18n/LanguageProvider';
import { getGuides, getCategories } from '@/src/i18n/data-translations';
import { t } from '@/src/i18n/dictionary';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import EmptyState from '@/src/components/kit/EmptyState';
import { Card } from '@/components/ui/card';
import { ArrowRight, Search } from 'lucide-react';

export default function SearchClient() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  const dataGuides = getGuides(lang);
  const dataCategories = getCategories(lang);

  const results = q
    ? dataGuides.filter((g) =>
        g.title.toLowerCase().includes(q) ||
        g.product.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.excerpt?.toLowerCase().includes(q) ?? false),
      )
    : [];

  const categoryName = (slug: string) => dataCategories.find((c) => c.slug === slug)?.name || slug;

  return (
    <Section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-6">
      <PageHeader title={t('searchResults', lang)} description={q ? `"${q}"` : t('enterSearch', lang)} className="mb-4" />

      {!q ? (
        <EmptyState title={t('startTyping', lang)} description="" icon={Search} />
      ) : results.length === 0 ? (
        <EmptyState title={`${t('noGuides', lang)}: "${q}"`} description="" />
      ) : (
        <Card className="divide-y divide-slate-200/80 dark:divide-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-2xl">
          {results.map((g) => (
            <div key={`${g.category}-${g.slug}`} className="group p-4 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-2xl">
              <Link
                href={`/categories/${g.category}/${g.slug}`}
                className="text-lg font-semibold text-slate-800 hover:text-saffron-700 dark:text-slate-100 dark:hover:text-saffron-400"
              >
                {g.title}
                <ArrowRight className="inline-block w-4 h-4 ml-1 align-middle transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              {g.excerpt && <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{g.excerpt}</p>}
              <span className="text-xs text-slate-500 dark:text-slate-400">Category: {categoryName(g.category)}</span>
            </div>
          ))}
        </Card>
      )}
    </Section>
  );
}
