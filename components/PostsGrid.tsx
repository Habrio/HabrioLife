"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { container, item, hover, spring } from '@/lib/motion';
import { publicImageUrl } from '@/lib/supabase';

export type Guide = {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  cover_image_path?: string | null;
};

function heroFor(g: Guide) {
  if (g?.cover_image_path) return publicImageUrl(g.cover_image_path);
  return '';
}

export default function PostsGrid({ guides }: { guides: Guide[] }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {guides.map((g) => (
        <motion.article key={g.id} variants={item} whileHover={hover} transition={spring}>
          <Link
            href={`/categories/${g.categorySlug}/${g.subcategorySlug}/${g.slug}`}
            className="group block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {heroFor(g) ? (
              <img src={heroFor(g)} alt={g.title} className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
            ) : (
              <div className="h-56 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            )}
            <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-800 group-hover:text-saffron-700 dark:text-slate-100 dark:group-hover:text-saffron-400">
              {g.title}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">By Habrio</p>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
