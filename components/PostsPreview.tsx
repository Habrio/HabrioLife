"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { container, item, hover, spring } from '@/src/lib/motion';
import { useEffect, useState } from 'react';
import { publicImageUrl } from '@/src/lib/supabase';
import { fetchLatestBlogs, fetchAllCategoriesMap, fetchAllSubcategoriesMap } from '@/src/lib/queries';

type Row = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category_id: string;
  subcategory_id: string;
  cover_image_path?: string | null;
};

export default function PostsPreview() {
  const [rows, setRows] = useState<Row[]>([]);
  const [catSlugMap, setCatSlugMap] = useState<Map<string, string>>(new Map());
  const [subSlugMap, setSubSlugMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const latest = await fetchLatestBlogs(6);
        const catMap = await fetchAllCategoriesMap();
        const subMap = await fetchAllSubcategoriesMap();
        if (!mounted) return;
        setRows(latest as any);
        setCatSlugMap(new Map(Array.from(catMap.entries()).map(([id, c]) => [id, (c as any).slug])));
        setSubSlugMap(new Map(Array.from(subMap.entries()).map(([id, s]) => [id, (s as any).slug])));
      } catch (e) {
        // ignore for preview
      }
    })();
    return () => { mounted = false; };
  }, []);
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Latest Posts</h2>
        <Link
          href="/posts"
          className="text-sm font-medium text-slate-700 hover:text-saffron-700 dark:text-slate-300 dark:hover:text-saffron-400"
        >
          All Posts →
        </Link>
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rows.map((g) => {
          const img = getHeroImage(g);
          return (
            <motion.article key={`${g.category}-${g.slug}`} variants={item} whileHover={hover} transition={spring}>
              <Link href={`/categories/${catSlugMap.get((g as any).category_id) ?? ''}/${subSlugMap.get((g as any).subcategory_id) ?? ''}/${g.slug}`} className="group block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {(g.cover_image_path ? publicImageUrl(g.cover_image_path) : undefined) ? (
                  <img src={publicImageUrl(g.cover_image_path as string)} alt={g.title} className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
                ) : (
                  <div className="h-56 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
                )}
                <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-800 group-hover:text-saffron-700 dark:text-slate-100 dark:group-hover:text-saffron-400">
                  {g.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">By Habrio • Guides</p>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
