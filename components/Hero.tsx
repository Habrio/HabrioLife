'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import SearchBox from '@/components/SearchBox';

const easingOut: [number, number, number, number] = [0.16, 1, 0.3, 1]; // ≈ easeOut
const easingInOut: [number, number, number, number] = [0.42, 0, 0.58, 1]; // ≈ easeInOut

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easingOut },
  },
};

export default function Hero(): JSX.Element {

  return (
    <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply blur-xl animate-pulse" />
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply blur-xl animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Central Search */}
          <motion.div variants={itemVariants} className="mb-8">
            <SearchBox />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-white">
              Discover How to Buy
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              the Best Products
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl"
          >
            Expert tips and step-by-step guides to help you make smart purchasing decisions.
            <br className="hidden md:block" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              Shop smarter, buy with confidence.
            </span>
          </motion.p>

          {/* Primary CTAs removed; search is the central action */}
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'loop', ease: easingInOut }}
        className="absolute left-8 top-1/4 hidden h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 lg:block"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'loop', ease: easingInOut, delay: 2 }}
        className="absolute bottom-1/4 right-12 hidden h-16 w-16 rounded-full bg-gradient-to-br from-pink-400 to-orange-500 opacity-20 lg:block"
      />
    </section>
  );
}
