"use client";

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getCategories } from '@/i18n/data-translations';
import { Baby, HeartPulse, Home as HomeIcon, ShoppingBag, Sofa, Wallet } from 'lucide-react';

const iconFor: Record<string, any> = {
  'daily-essentials': ShoppingBag,
  'household-needs': HomeIcon,
  'health-personal-care': HeartPulse,
  'baby-kids-school': Baby,
  'decor-furniture-storage': Sofa,
  'smart-spending-financials': Wallet,
};

export default function CategoryRow() {
  const { lang } = useLanguage();
  const cats = getCategories(lang);
  return (
    <div className="mx-auto mt-2 grid max-w-5xl grid-cols-3 gap-3 sm:grid-cols-6">
      {cats.map((c) => {
        const Icon = iconFor[c.slug] || ShoppingBag;
        return (
          <Link
            href={`/categories/${c.slug}`}
            key={c.slug}
            className="group flex items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 backdrop-blur hover:bg-white dark:border-slate-700/70 dark:bg-slate-800/60 dark:text-slate-200"
          >
            <Icon className="h-4 w-4 text-saffron-600" />
            <span className="line-clamp-1 text-center">{c.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

