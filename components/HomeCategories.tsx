"use client";

import { useEffect, useState } from 'react';
import PostsGrid, { Guide } from '@/components/PostsGrid';
import Link from 'next/link';
import {
  fetchSubcategoriesByCategorySlug,
  fetchGuidesInCategory,
  fetchGuidesInSubcategory,
  fetchLatestBlogs,
  fetchAllCategoriesMap,
  fetchAllSubcategoriesMap,
} from '@/src/lib/queries';

type CatLite = { slug: string; name: string };

export default function HomeCategories({ categoriesOverride }: { categoriesOverride?: CatLite[] }) {
  const cats = categoriesOverride ?? [];
  const [hoverCat, setHoverCat] = useState<string | undefined>(undefined); // for showing subs
  const [selectedCat, setSelectedCat] = useState<string | undefined>(undefined); // click selection
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined);
  const [subMap, setSubMap] = useState<Record<string, { name: string; slug: string }[]>>({});
  const [posts, setPosts] = useState<Guide[]>([]);
  const [catSlugMap, setCatSlugMap] = useState<Map<string, string>>(new Map());
  const [subSlugMap, setSubSlugMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    (async () => {
      const catMap = await fetchAllCategoriesMap();
      const subMap = await fetchAllSubcategoriesMap();
      setCatSlugMap(new Map(Array.from(catMap.entries()).map(([id, c]: any) => [id, c.slug])));
      setSubSlugMap(new Map(Array.from(subMap.entries()).map(([id, s]: any) => [id, s.slug])));
    })();
  }, []);

  // Load subcategories on hover or selection
  useEffect(() => {
    const cat = hoverCat || selectedCat;
    if (cat && !subMap[cat]) {
      fetchSubcategoriesByCategorySlug(cat).then((subs) => {
        setSubMap((prev) => ({ ...prev, [cat]: subs }));
      });
    }
  }, [hoverCat, selectedCat, subMap]);

  // Load posts based on selections
  useEffect(() => {
    let active = true;
    (async () => {
      let data: any[] = [];
      if (selectedCat && selectedSub) {
        data = await fetchGuidesInSubcategory(selectedCat, selectedSub);
      } else if (selectedCat) {
        data = await fetchGuidesInCategory(selectedCat);
      } else {
        data = await fetchLatestBlogs(6);
      }
      if (!active) return;
      const mapped = (data || []).slice(0, 6).map((g: any) => ({
        id: g.id,
        title: g.title,
        slug: g.slug,
        categorySlug: catSlugMap.get(g.category_id) || '',
        subcategorySlug: subSlugMap.get(g.subcategory_id) || '',
        cover_image_path: g.cover_image_path,
      }));
      setPosts(mapped);
    })();
    return () => {
      active = false;
    };
  }, [selectedCat, selectedSub, catSlugMap, subSlugMap]);

  const activeCatForSubs = hoverCat || (selectedSub ? selectedCat : undefined);
  const subs = activeCatForSubs ? subMap[activeCatForSubs] || [] : [];

  return (
    <div
      className="mx-auto max-w-7xl"
      onMouseLeave={() => setHoverCat(selectedSub ? selectedCat : undefined)}
      onMouseEnter={() => {
        /* keep state while inside block */
      }}
    >
      {/* Category tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2 dark:border-slate-700">
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

      {/* Subcategories row */}
      {subs.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 rounded-xl border border-slate-200 bg-white/70 px-2 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
          {subs.map((s) => (
            <button
              key={s.slug}
              onClick={() => {
                setSelectedCat(activeCatForSubs);
                setSelectedSub((prev) => (prev === s.slug ? undefined : s.slug));
              }}
              className={`rounded-xl border px-3 py-3 text-sm font-semibold tracking-wide transition-colors ${
                selectedSub === s.slug && selectedCat === activeCatForSubs
                  ? 'border-saffron-300 bg-saffron-50 text-saffron-700 dark:border-slate-600 dark:bg-slate-800 dark:text-saffron-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Posts grid bound to active selections */}
      <div className="mt-6">
        <PostsGrid guides={posts} />
      </div>

      {/* All posts link based on selection */}
      <div className="mt-4 text-center">
        {(() => {
          const label = selectedSub
            ? `${subs.find((s) => s.slug === selectedSub)?.name || selectedSub} Posts →`
            : selectedCat
            ? `${cats.find((c) => c.slug === selectedCat)?.name} Posts →`
            : 'All Posts →';
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
