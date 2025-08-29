"use client";
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type RatingProps = {
  value: number; // 0-5
  count?: number;
  className?: string;
};

const Rating = ({ value, count, className }: RatingProps) => {
  const filled = Math.round(Math.max(0, Math.min(5, value)));
  return (
    <div className={cn('flex items-center gap-1', className)} aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn('h-4 w-4', i < filled ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-600')} />
      ))}
      {typeof count === 'number' ? (
        <span className="ml-1 text-xs text-slate-600 dark:text-slate-400">({count})</span>
      ) : null}
    </div>
  );
};

export default Rating;

