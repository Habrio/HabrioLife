"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { container, item, hover, spring } from '@/src/lib/motion';
import { useLanguage } from '@/src/i18n/LanguageProvider';
import { getGuides } from '@/src/i18n/data-translations';
import { publicImageUrl } from '@/src/lib/supabase';

function heroFor(g: any) {
  if (g?.cover_image_path) return publicImageUrl(g.cover_image_path);
  const r = g?.recommendations as any;
  return r?.['mid-range']?.[0]?.image || r?.['budget']?.[0]?.image || r?.['premium']?.[0]?.image;
}

export default function PostsGrid({ guides }: { guides: any[] }) {
  const { lang } = useLanguage();
  const localized = getGuides(lang);
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(guides || localized).map((g) => (
        <motion.article key={`${g.category}-${g.slug}`} variants={item} whileHover={hover} transition={spring}>
          <Link href={`/categories/${g.category}/${g.slug}`} className="group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {heroFor(g) ? (
              <img src={heroFor(g)} alt={g.title} className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
            ) : (
              <div className="h-56 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            )}
            <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-800 group-hover:text-saffron-700 dark:text-slate-100 dark:group-hover:text-saffron-400">
              {g.title}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">By Habrio • {g.category}</p>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
