"use client";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { hover, spring, item } from '@/src/lib/motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const productCardVariants = cva('rounded-2xl shadow-sm', {
  variants: {
    variant: {
      elevated: 'shadow-md',
      outline: 'border',
    },
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    size: 'md',
  },
});

type ProductCardProps = VariantProps<typeof productCardVariants> & {
  title: string;
  price?: string;
  href?: string;
  image?: string;
  ctaLabel?: string;
  className?: string;
};

const ProductCard = ({ title, price, href, image, ctaLabel = 'View', variant, size, className }: ProductCardProps) => {
  const content = (
    <Card className={cn(productCardVariants({ variant, size }), className)}>
      {image ? (
        <CardHeader className="p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="h-44 w-full rounded-t-2xl object-cover" />
        </CardHeader>
      ) : null}
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          {price ? <span className="shrink-0 text-sm font-medium text-slate-700 dark:text-slate-300">{price}</span> : null}
        </div>
      </CardContent>
      <CardFooter>
        <Button className={cn(buttonVariants(), 'w-full')}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <motion.div variants={item} whileHover={hover} transition={spring}>
      {href ? <Link href={href}>{content}</Link> : content}
    </motion.div>
  );
};

export default ProductCard;
