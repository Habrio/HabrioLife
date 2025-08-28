'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { categories } from '@/lib/data';

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
          whileHover={{ y: -5 }}
          className="group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition-all"
        >
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
