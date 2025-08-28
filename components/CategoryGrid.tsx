'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { categories } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';
import { Monitor, ShoppingBag, Home as HomeIcon, Dumbbell, BookOpen } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  electronics: Monitor,
  fashion: ShoppingBag,
  'home-garden': HomeIcon,
  sports: Dumbbell,
  books: BookOpen,
};

function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.01 }}
          className="group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow hover:shadow-xl transition-all text-center"
        >
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900">
            {(() => {
              const Icon = iconMap[cat.slug];
              return Icon ? (
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              ) : null;
            })()}
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-100">{cat.name}</h3>
          {cat.description && (
            <p className="text-slate-600 dark:text-slate-400 mb-4">{cat.description}</p>
          )}
          <Link href={`/categories/${cat.slug}`} className="absolute inset-0 z-10" />
        </motion.div>
      ))}
    </div>
  );
}

export default CategoryGrid;
