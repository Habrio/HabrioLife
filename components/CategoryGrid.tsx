"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { categories } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';
import { Monitor, ShoppingBag, Home as HomeIcon, Dumbbell, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { container, item, hover, spring } from '@/src/lib/motion';

const iconMap: { [key: string]: LucideIcon } = {
  electronics: Monitor,
  fashion: ShoppingBag,
  'home-garden': HomeIcon,
  sports: Dumbbell,
  books: BookOpen,
};

function CategoryGrid() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {categories.map((cat) => {
        const Icon = iconMap[cat.slug];
        return (
          <motion.div key={cat.slug} variants={item} whileHover={hover} transition={spring}>
            <Link href={`/categories/${cat.slug}`} aria-label={`Open ${cat.name} category`}>
              <Card className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <CardHeader className="p-0">
                  <div className="flex items-center justify-center h-28 bg-gradient-to-br from-saffron-50 to-white dark:from-slate-800 dark:to-slate-900">
                    {Icon ? <Icon className="h-8 w-8 text-saffron-600" /> : null}
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{cat.name}</h3>
                      {cat.description ? (
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{cat.description}</p>
                      ) : null}
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
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
