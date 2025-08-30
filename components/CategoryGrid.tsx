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

const categoryImages: Record<string, string> = {
  electronics:
    'https://images.pexels.com/photos/18106/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
  fashion:
    'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
  'home-garden':
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  sports:
    'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
  books:
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=800',
};

function CategoryGrid() {
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
