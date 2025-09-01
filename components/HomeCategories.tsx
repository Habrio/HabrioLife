"use client";

import { useMemo, useState } from 'react';
import { useLanguage } from '@/src/i18n/LanguageProvider';
import { getCategories, getGuides, getSubcategories } from '@/src/i18n/data-translations';
import PostsGrid from '@/components/PostsGrid';
import Link from 'next/link';

type CatLite = { slug: string; name: string };

export default function HomeCategories({ categoriesOverride }: { categoriesOverride?: CatLite[] }) {
  const { lang } = useLanguage();
  const cats = categoriesOverride ?? getCategories(lang);
  const [hoverCat, setHoverCat] = useState<string | undefined>(undefined); // for showing subs
  const [selectedCat, setSelectedCat] = useState<string | undefined>(undefined); // click selection
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined);

  const allGuides = useMemo(() => getGuides(lang), [lang]);
  const posts = useMemo(() => {
    if (selectedSub && selectedCat) {
      return allGuides.filter((g: any) => g.category === selectedCat && g.subcategory === selectedSub).slice(0, 6);
    }
    if (selectedCat) {
      return allGuides.filter((g: any) => g.category === selectedCat).slice(0, 6);
    }
    return allGuides.slice(0, 6);
  }, [allGuides, selectedCat, selectedSub]);

  const subs = hoverCat ? getSubcategories(hoverCat).map((s) => s.name) : [];

  return (
    <div
      className="mx-auto max-w-7xl"
      onMouseLeave={() => setHoverCat(undefined)}
      onMouseEnter={() => {
        /* keep state while inside block */
      }}
    >
      {/* Category tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 dark:border-slate-700">
        {cats.map((c) => (
          <button
            key={c.slug}
            onMouseEnter={() => setHoverCat(c.slug)}
            onFocus={() => setHoverCat(c.slug)}
            onClick={() => {
              setSelectedSub(undefined);
              setSelectedCat((prev) => (prev === c.slug ? undefined : c.slug));
            }}
            className={`mx-1 flex-1 py-3 text-center text-base md:text-lg font-semibold tracking-wide transition-colors ${
              (selectedCat || hoverCat) === c.slug ? 'text-saffron-700 dark:text-saffron-400' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            {c.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Subcategories row on hover only; remains visible when moving cursor down */}
      {hoverCat && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 rounded-xl border border-slate-200 bg-white/70 px-2 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
          {subs.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedCat(hoverCat);
                setSelectedSub((prev) => (prev === s ? undefined : s));
              }}
              className={`rounded-xl border px-3 py-3 text-sm font-semibold tracking-wide transition-colors ${
                selectedSub === s && selectedCat === hoverCat
                  ? 'border-saffron-300 bg-saffron-50 text-saffron-700 dark:border-slate-600 dark:bg-slate-800 dark:text-saffron-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Posts grid bound to active selections */}
      <div className="mt-6">
        <PostsGrid guides={posts as any[]} />
      </div>

      {/* All posts link based on selection */}
      <div className="mt-4 text-center">
        {(() => {
          const label = selectedSub ? `${selectedSub} Posts →` : selectedCat ? `${cats.find((c) => c.slug === selectedCat)?.name} Posts →` : 'All Posts →';
          const href = selectedSub
            ? `/posts?category=${encodeURIComponent(selectedCat || '')}&sub=${encodeURIComponent(selectedSub)}`
            : selectedCat
            ? `/posts?category=${encodeURIComponent(selectedCat)}`
            : '/posts';
          return (
            <Link
              href={href}
              className="inline-block rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {label}
            </Link>
          );
        })()}
      </div>
    </div>
  );
}
