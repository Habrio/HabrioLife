'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Star,
  Users,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';

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
  const stats: { icon: LucideIcon; value: string; label: string; color: string }[] = [
    { icon: Star, value: '4.9/5', label: 'User Rating', color: 'text-yellow-500' },
    { icon: Users, value: '50K+', label: 'Happy Readers', color: 'text-green-500' },
    { icon: BookOpen, value: '20+', label: 'Buying Guides', color: 'text-blue-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full border border-blue-200 dark:border-blue-800">
              <BookOpen className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                🔥 New Buying Guides Available
              </span>
            </div>
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

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59,130,246,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="group rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Link href="/categories" className="flex items-center">
                Browse Guides
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl border border-slate-200 bg-white/10 px-8 py-4 text-lg font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 dark:border-slate-700 dark:bg-slate-800/20 dark:text-slate-300 dark:hover:bg-slate-800/30"
            >
              <Link href="/about">How It Works</Link>
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {stats.map(({ icon: Icon, value, label, color }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-slate-200/20 bg-white/5 p-6 text-center backdrop-blur-sm dark:border-slate-700/20 dark:bg-slate-800/20"
              >
                <Icon className={`mx-auto mb-3 h-8 w-8 ${color}`} />
                <div className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
              </motion.div>
            ))}
          </motion.div>
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
