"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/src/i18n/LanguageProvider';
import { getCategories } from '@/src/i18n/data-translations';
import type { LucideIcon } from 'lucide-react';
import { ShoppingBag, Home as HomeIcon, HeartPulse, Baby, Sofa, Wallet, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { container, item, hover, spring } from '@/src/lib/motion';

const iconMap: { [key: string]: LucideIcon } = {
  'daily-essentials': ShoppingBag,
  'household-needs': HomeIcon,
  'health-personal-care': HeartPulse,
  'baby-kids-school': Baby,
  'decor-furniture-storage': Sofa,
  'smart-spending-financials': Wallet,
};

const categoryImages: Record<string, string> = {
  'daily-essentials': 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
  'household-needs': 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  'health-personal-care': 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=800',
  'baby-kids-school': 'https://images.pexels.com/photos/346796/pexels-photo-346796.jpeg?auto=compress&cs=tinysrgb&w=800',
  'decor-furniture-storage': 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
  'smart-spending-financials': 'https://images.pexels.com/photos/4968638/pexels-photo-4968638.jpeg?auto=compress&cs=tinysrgb&w=800',
};

function CategoryGrid() {
  const { lang } = useLanguage();
  const categories = getCategories(lang);
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {categories.map((cat) => {
        const Icon = iconMap[cat.slug];
        const image = categoryImages[cat.slug];
        return (
          <motion.div key={cat.slug} variants={item} whileHover={hover} transition={spring}>
            <Link href={`/categories/${cat.slug}`} aria-label={`Open ${cat.name} category`}>
              <Card className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <CardHeader className="p-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {image ? (
                    <img src={image} alt={cat.name} className="h-24 w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex items-center justify-center h-24 bg-gradient-to-br from-saffron-50 to-white dark:from-slate-800 dark:to-slate-900">
                      {Icon ? <Icon className="h-6 w-6 text-saffron-600" /> : null}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{cat.name}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default CategoryGrid;
