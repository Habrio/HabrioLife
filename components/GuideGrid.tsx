"use client";

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { container, item, hover, spring } from '@/src/lib/motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/src/i18n/LanguageProvider';
import { getGuides } from '@/src/i18n/data-translations';
import { publicImageUrl } from '@/src/lib/supabase';

type Guide = {
  slug: string;
  title: string;
  excerpt?: string;
  // shapely enough for image lookup
  recommendations?: {
    [tier: string]: Array<{
      title: string;
      price: string;
      rating: number;
      image?: string;
      affiliate?: string;
    }>;
  };
};

export default function GuideGrid({
  guides,
  categorySlug,
  subSlugById,
}: {
  guides: Guide[];
  categorySlug: string;
  subSlugById?: Record<string, string>;
}) {
  const { lang } = useLanguage();
  const localizedBySlug = new Map(getGuides(lang).map((g: any) => [g.slug, g]));
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => {
        const lg = localizedBySlug.get(guide.slug) || guide;
        const recs = (guide as any).recommendations as any;
        let heroImage =
          (guide as any).cover_image_path
            ? publicImageUrl((guide as any).cover_image_path)
            : undefined;
        if (!heroImage && recs) {
          heroImage =
            recs?.['mid-range']?.[0]?.image ||
            recs?.['budget']?.[0]?.image ||
            recs?.['premium']?.[0]?.image;
        }
        const subSlug =
          (guide as any).subcategory_slug ||
          (subSlugById && subSlugById[(guide as any).subcategory_id]);
        return (
          <motion.div key={guide.slug} variants={item} whileHover={hover} transition={spring}>
            <Link href={`/categories/${categorySlug}/${subSlug ?? ''}/${guide.slug}`} aria-label={`Read guide: ${guide.title}`}>
              <Card className="overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/70 backdrop-blur border border-slate-200/80 dark:border-slate-700/70 shadow-sm hover:shadow-md transition-shadow">
                {heroImage ? (
                  <CardHeader className="p-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroImage} alt={guide.title} className="h-40 w-full object-cover" loading="lazy" />
                  </CardHeader>
                ) : null}
                          <CardContent className="p-5">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-2">{lg.title}</h3>
                            {(lg as any).excerpt ? (
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{(lg as any).excerpt}</p>
                            ) : null}
                          </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button variant="default" className="rounded-full">
                    Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
