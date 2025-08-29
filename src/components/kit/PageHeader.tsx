"use client";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { item } from '@/lib/motion';
import { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => {
  return (
    <div className={cn('mb-6 sm:mb-8', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <motion.h1 variants={item} className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            {title}
          </motion.h1>
          {description ? (
            <motion.p variants={item} className="mt-1 text-slate-600 dark:text-slate-400">
              {description}
            </motion.p>
          ) : null}
        </div>
        {actions ? <motion.div variants={item}>{actions}</motion.div> : null}
      </div>
    </div>
  );
};

export default PageHeader;

