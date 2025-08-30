"use client";

import Link from 'next/link';
import { guides } from '@/lib/data';
import { motion } from 'framer-motion';
import { container, item, hover, spring } from '@/src/lib/motion';

function getHeroImage(g: any) {
  const recs = g?.recommendations as any;
  return (
    recs?.['mid-range']?.[0]?.image ||
    recs?.['budget']?.[0]?.image ||
    recs?.['premium']?.[0]?.image ||
    undefined
  );
}

export default function PostsPreview() {
  const latest = guides.slice(0, 3); // assuming array is curated; adjust ordering as needed
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
        {latest.map((g) => {
          const img = getHeroImage(g);
          return (
            <motion.article key={`${g.category}-${g.slug}`} variants={item} whileHover={hover} transition={spring}>
              <Link href={`/categories/${g.category}/${g.slug}`} className="group block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {img ? (
                  <img src={img} alt={g.title} className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
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

