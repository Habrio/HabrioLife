"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { item } from '@/lib/motion';
import { LucideIcon, Search } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
  className?: string;
};

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Search,
  className,
}: EmptyStateProps) => {
  return (
    <motion.div variants={item}>
      <Card className={cn('text-center p-6', className)}>
        <CardContent className="pt-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-50 text-saffron-600 dark:bg-slate-800">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          {description ? (
            <p className="mt-1 text-slate-600 dark:text-slate-400">{description}</p>
          ) : null}
          {actionLabel && onAction ? (
            <Button className="mt-4" onClick={onAction}>
              {actionLabel}
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyState;

