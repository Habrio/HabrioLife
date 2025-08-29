import { Variants } from 'framer-motion';

export const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export const hover = { scale: 1.02 };
export const spring = { type: 'spring', stiffness: 260, damping: 20 } as const;

