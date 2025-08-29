"use client";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { container } from '@/lib/motion';
import { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

const Section = ({ children, className, id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      variants={container}
      initial="hidden"
      animate="show"
      className={cn('py-10 sm:py-14', className)}
    >
      {children}
    </motion.section>
  );
};

export default Section;

